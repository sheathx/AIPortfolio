from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import socket


def find_port(start=4173):
    for port in range(start, start + 50):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(("127.0.0.1", port)) != 0:
                return port
    raise RuntimeError("No available local port found.")


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = find_port()
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"Serving Raheem AI Portfolio at http://127.0.0.1:{port}", flush=True)
    server.serve_forever()
