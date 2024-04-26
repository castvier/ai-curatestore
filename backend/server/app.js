const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const OpenAI = require('openai');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/UsersDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// User model
const User = mongoose.model('UserInfo', new mongoose.Schema({
  username: String,
  password: String,
  email: String
}));

// Configure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Authentication Routes
app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    return res.status(400).send('Username or email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ username, password: hashedPassword, email });
  await newUser.save();
  res.send('Signup successful');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    res.send('Login successful');
  } else {
    console.log("password: ", await bcrypt.hash(password, 12));
    res.status(401).send('Invalid credentials');
  }
});

// Existing OpenAI Integration
// Place other existing OpenAI routes here...

async function generateContent(prompt, tone) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Tone: ${tone}\n${prompt}` }],
      max_tokens: 1024,
      temperature: 0.5,
    });
    const generatedContent = response.choices[0].message.content.trim();
    return { generated_content: generatedContent };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.error('OpenAI API error:', error);
    }
    throw new Error('An error occurred while generating content');
  }
}

async function generateCode(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
      temperature: 0.5,
    });
    const generatedCode = response.choices[0].message.content.trim();
    return { generated_code: generatedCode };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.error('OpenAI API error:', error);
    }
    throw new Error('An error occurred while generating code');
  }
}

async function generateEducationalContent(prompt, difficulty) {
  const difficultyPrefixMap = {
    Easy: "Explain like I'm five: ",
    Medium: "Explain like I'm a high school student: ",
    Hard: "Explain like I'm a graduate student specializing in the subject: ",
  };
  const difficultyPrefix = difficultyPrefixMap[difficulty] || "Explain like I'm five: ";
  const modifiedPrompt = difficultyPrefix + prompt;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: modifiedPrompt }],
      max_tokens: 1024,
      temperature: 0.5,
    });
    const generatedEducationalContent = response.choices[0].message.content.trim();
    return { generated_educational_content: generatedEducationalContent };
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.error('OpenAI API error:', error);
    }
    throw new Error('An error occurred while generating educational content');
  }
}

app.post('/api/generate_content', async (req, res) => {
  try {
    const { prompt, tone } = req.body;
    const { generated_content } = await generateContent(prompt, tone);
    res.json({ generated_content });
  } catch (error) {
    console.error('An error occurred while generating content:', error.message);
    res.status(500).json({ error: 'Failed to generate content. Please try again.' });
  }
});

app.post('/api/generate_code', async (req, res) => {
  try {
    const { prompt } = req.body;
    const { generated_code } = await generateCode(prompt);
    res.json({ generated_code });
  } catch (error) {
    console.error('An error occurred while generating code:', error.message);
    res.status(500).json({ error: 'Failed to generate code. Please try again.' });
  }
});

app.post('/api/generate_educational_content', async (req, res) => {
  try {
    const { prompt, difficulty } = req.body;
    const { generated_educational_content } = await generateEducationalContent(prompt, difficulty);
    res.json({ generated_educational_content });
  } catch (error) {
    console.error('An error occurred while generating educational content:', error.message);
    res.status(500).json({ error: 'Failed to generate educational content. Please try again.' });
  }
});

// Start server
const port = process.env.PORT || 8020;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
