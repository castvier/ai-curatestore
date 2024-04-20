# report_web_vitals.py

def report_web_vitals(on_perf_entry):
    # Define functions to measure different web performance metrics
    def get_cls():
        print("Cumulative Layout Shift (CLS) metric")

    def get_fid():
        print("First Input Delay (FID) metric")

    def get_fcp():
        print("First Contentful Paint (FCP) metric")

    def get_lcp():
        print("Largest Contentful Paint (LCP) metric")

    def get_ttfb():
        print("Time to First Byte (TTFB) metric")

    # Call the provided function to report each web performance metric
    on_perf_entry(get_cls)
    on_perf_entry(get_fid)
    on_perf_entry(get_fcp)
    on_perf_entry(get_lcp)
    on_perf_entry(get_ttfb)

# Example usage:
def log_metric(metric_fn):
    metric_fn()

if __name__ == "__main__":
    report_web_vitals(log_metric)