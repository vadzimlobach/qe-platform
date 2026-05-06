import http, { RefinedResponse, ResponseType } from "k6/http";

type HttpResponse = RefinedResponse<ResponseType>;

export class PerformanceApiClient {
  constructor(private readonly baseUrl: string) {}

  login(username: string, password: string): HttpResponse {
    return http.post(
      `${this.baseUrl}/auth/login`,
      JSON.stringify({ username, password }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  getProducts(token: string): HttpResponse {
    return http.get(`${this.baseUrl}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
