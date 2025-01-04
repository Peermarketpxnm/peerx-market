const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Notify about a new product
  socket.on("newProduct", (product) => {
    io.emit("newProductNotification", product);
  });

  // Notify about an order update
  socket.on("orderUpdate", (order) => {
    io.emit("orderUpdateNotification", order);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
