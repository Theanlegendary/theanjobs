#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

PORT = 5173
DIRECTORY = os.path.join(os.path.dirname(__file__), "artifacts", "builtin-recreation", "dist", "public")

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable cache completely so changes reflect instantly
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Extract requested path without query string or hash
        req_path = self.path.split('?')[0].split('#')[0]
        # Resolve target file on disk
        target_file = os.path.normpath(os.path.join(DIRECTORY, req_path.lstrip('/')))
        
        # If requesting existing file or asset, serve it normally
        if os.path.exists(target_file) and not os.path.isdir(target_file):
            return super().do_GET()
        
        # Otherwise fallback to index.html for SPA client-side routing
        self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    if not os.path.exists(DIRECTORY):
        print(f"Error: Directory {DIRECTORY} does not exist. Run 'pnpm run build' first.")
        sys.exit(1)
        
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), SPAServer) as httpd:
        print(f"Serving SPA from {DIRECTORY} on http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
