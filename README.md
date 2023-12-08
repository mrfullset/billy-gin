# Billy Gin 🍶

Seamless blue/green deployment based on Nginx Proxy Manager.

## Blue/Green deployment

🤔 How to roll a new version of an app without any
downtime? **Blue/Green deployment** is a deployment
workflow where you have 2 independent app containers.

💭 Imagine you have an API `api.example.com`. With
Blue/Green workflow you start with the following
configuration:

| 🟢              | 🔵                    |
|-----------------|-----------------------|
| api.example.com | api-stage.example.com |
| `v1.0.0`        | `v1.0.0`              |
| Container `A`   | Container `B`         |

Your production uses `api.example.com` so it
must have 0 downtime. Otherwise, `api-stage.example.com`
is only for internal usage, so it doesn't matter
if there is any downtime.

You roll out an update (`v1.0.1`) to the container `B`.
If it's required, it's safe to restart it, shut down etc.
Your current configuration looks like this:

| 🟢              | 🔵                    |
|-----------------|-----------------------|
| api.example.com | api-stage.example.com |
| `v1.0.0`        | `v1.0.1`              |
| Container `A`   | Container `B`         |

After you spin up and tested a new version
(remember, you can still access it via `api-stage.example.com`) just swap gateways of Green and Blue
hosts:

| 🟢              | 🔵                    |
|-----------------|-----------------------|
| api.example.com | api-stage.example.com |
| `v1.0.1`        | `v1.0.0`              |
| Container `B`   | Container `A`         |


🎉 Done. You have deployed a new udpate with 0 downtime.

## Usage

Do a `POST /toggle` request with `Authorization` header:
```
Authorization: Bearer supersecret
```
That's it. You have seamlessly swapped two
containers.

Also you'd be interested in following endpoints:

- `GET /blue` - get current blue proxy info
- `GET /green` - get current green proxy info

## Setup

**❗️ Before start:**

This is an "add-on" for the [Nginx Proxy Manager](https://github.com/NginxProxyManager/nginx-proxy-manager). If you do not use it this project isn't suitable for you.

I really recommend you to see the original project. It's a handy tool which makes DevOps much easier ✨

### 📝 Service account

BillyGin needs a **service account** to work.
You can create it under **Users > Add users** in the
Nginx Proxy Manager UI.

If you don't want to give admin rights, select `Manage`
role for all **Proxy hosts**.

Then, set a password for the created user (_three dots, Change password_).

### 🟢🔵 Green and Blue containers

To make possible for BillyGin to operate with proxy hosts
it's required to create those hosts first.

Do it as usual under **Proxy hosts**. Create records
for *green* and *blue* hosts.

Example:

- Green host:
  - Domain: `api.example.com`
  - Forward hostname: `api_a`

- Blue host:
  - Domain: `api-stage.example.com`
  - Forward hostname: `api_b`


### 🌲 Environment variables

BillyGin is using environment variables to configure
itself. You can pass them via `.env` file.

```env
PORT=3000
HOST="0.0.0.0"

NGINX_PROXY_MANAGER_URL=http://proxy:81
NGINX_PROXY_MANAGER_SA_EMAIL="billygin_sa@example.com"
NGINX_PROXY_MANAGER_SA_SECRET="somesecret"

GREEN_DOMAIN=api.example.com
BLUE_DOMAIN=api-stage.example.com

A_FORWARD_HOST=api_a
B_FORWARD_HOST=api_b

SECRET="anothersecret"
```

- `NGINX_PROXY_MANAGER_URL` - instance of Nginx Proxy
  Manager
- `NGINX_PROXY_MANAGER_SA_EMAIL` - email of created
  service account (user)
- `NGINX_PROXY_MANAGER_SA_SECRET` - password of
  created service account
- `GREEN_DOMAIN` - "production" domain (without
  protocol or slashes)
- `BLUE_DOMAIN` - "staging" domain (same rules)
- `A_FORWARD_HOST` - `A` container host (without port, protocol]
  or slashes)
- `B_FORWARD_HOST` - `B` container host (same rules)
- `SECRET` - service key to sign 
requests (any string you want)

**All listed variables are required.**


### 🖥️ Run natively
**Prerequisites**

- 🚀 NodeJS v18

Clone this repo. Create `.env` file with
configurations. Run following commands:

```console
npm i
npm run build
npm start
```

### 🐳 Docker compose
**Prerequisites**

- 🐳 Docker (compose)

Create a `docker-compose.yml` file with
the following contents:

```yaml
version: "3"
services:
  billy-gin:
    container_name: billy-gin
    image: "mrfullset/billy-gin:latest"
    env_file:
      - .env
```

Put `.env` file near to `docker-compose.yml`. Run:

```console
docker compose up -d
```

### ☝️ Recomendations

If you use a proxy host to Nginx Proxy Manager
itself, it's a good idea to add BillyGin as
`Custom location` to its record, so you don't need
to register a separate domain for it or expose ports
from Docker. Example settings:

- Location: `/billy-gin/`
- Forward hostname: `billy-gin/`.

**Preserve slashes as they are in the example**



