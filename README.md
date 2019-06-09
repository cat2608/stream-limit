## Stream Limit Service

This approach uses Express middleware to validate when a user can watch a new stream.

### Resources

Middleware are applied to the following endpoints:

|        | Endpoints           | Description           | Required                                            | Middleware                                |
|:-------|:------------------- |:----------------------|:----------------------------------------------------|:------------------------------------------|
| `GET`  | `/api/play/:clipId` | Play `clipId` content | `Authorization` header or <br> `token` param on URL | `addToPlaybackList` <br> `isPlaylistLimit`|
| `POST` | `/api/user/logout`  | Logout user           | `Authorization` header or <br> `token` param on URL | `removeFromPlaybackList`                  |


#### Authorization

- Authentication implementation is ignored and it works providing HTTP `Authorization` request header or `token` param:

```bash
curl -X GET \
  http://127.0.0.1:3000/api/play/CLIP_ID \
  -H 'Authorization: Bearer eyJlbWFpbCI6ImFubmFAbWFpbC5jb20ifQ=='

curl -X GET \
  'http://127.0.0.1:3000/api/play/7a7dc4ae-549d-481b-b7d8-46ef02981745?token=eyJlbWFpbCI6ImFubmFAbWFpbC5jb20ifQ=='
```

- Authorization schema type `Bearer` and credentials contains base64 encoding `VALUE` for email (acting as user ID)

#### Middleware

- `addToPlaybackList` This service will track every new request to watch a content into `openConnections` variable.
- `isPlaylistLimit` This service will return `{ status: 403, message: 'FORBIDDEN' }` response when user exceeds more than 3 requests to play content.
- `removeFromPlaybackList`: When user logout a device, it will decrease reference to open connections.

### Scaling

- We could make use of Node clustering to scale the application execution on multiple processor cores by creating worker processes to solve some issues such as HTTP request bottlenecks.
- Load balancer: we can run multiple instances of a Node application and use an NGINX server to proxy requests/connections.

### Monitoring

- Detecting and preventing downtimes via log monitoring tools like Keymetrics, New Relic.
- Collect memory usage to find out memory leak issues

### Running service and test

- Server on port `3000`

```bash
npm install
npm run dev
npm test
```

#### Some assumptions

- For simplicity, this exercise is only faking one DB query response.
