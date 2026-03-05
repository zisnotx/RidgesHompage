#!/usr/bin/env python3
"""
Multi-Calculator Suite - Homepage Server
Serves the calculator homepage with four calculator sections.
"""

import http.server
import socketserver
import os

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Available calculators:")
        print("   1. Basic Arithmetic (+, -, *, /, ^, %)")
        print("   2. Logarithmic (log10, ln, log2)")
        print("   3. Factorization (Prime factors)")
        print("   4. Trigonometric (sin, cos, tan)")
        print("\nPress Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped")

if __name__ == "__main__":
    main()
