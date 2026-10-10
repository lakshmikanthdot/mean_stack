// use
// one part of application announced that something has happend
// other part of application is listening to that event and it will take action

// once user registered ->
// send welcome email
// write a log to the database
// notify some other service
// bases on user registration we are doing some activity

// emit one event -> listeners listen to this event and do something

// .on() -> register one listerner, every time event is emitted, listener will be called
// .once() -> register one listener, it will be called only once when event is emitted
// .emit() -> triggers an event and sendsto the listeners

import EventEmitters from "node:events";

const appEvents = new EventEmitters();

type UserRegisterPayload = {
  id: number;
  email: string;
};

// listeners
appEvents.on("once_user_registered", (user: UserRegisterPayload) => {
  console.log(`email listener: welcome email sent to this user ${user.email}`);
});

appEvents.on("once_user_registered", (user: UserRegisterPayload) => {
  console.log(`log listener: user with id ${user.id} is registered`);
});

appEvents.once("app.started", () => {
  console.log("once listener : app started");
});

function registeruser(): void {
  const user = {
    id: 1,
    email: "lucky@gmail.com",
  };
  console.log("user saved to the database");
  // emit an event
  appEvents.emit("once_user_registered", user);
  console.log("user registration process completed");
}

appEvents.emit("app.started");
appEvents.emit("app.started");

registeruser();

// once listener : app started
// user saved to the database
// email listener: welcome email sent to this user lucky@gmail.com
// log listener: user with id 1 is registered
// user registration process completed
