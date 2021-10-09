FROM denoland/deno:1.13.2

EXPOSE 5000


WORKDIR /app


COPY ./routes ./routes
COPY ./public ./public
COPY main.ts .
COPY ratelimit.ts .


CMD ["run", "--allow-all", "main.ts"]
