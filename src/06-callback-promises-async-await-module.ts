type User = {
  id: number;
  name: string;
  role: "user" | "super-admin";
};
const users: User[] = [
  { id: 1, name: "Lucky", role: "super-admin" },
  { id: 2, name: "kanth", role: "user" },
  { id: 3, name: "roman", role: "user" },
];

// callback is a function - this fun u r passing to a diff function as an argument
// callback(error, result) -> *** imp concept this is a classic nodejs callback pattern

//
function finduserWithCallback(
  userId: number,
  callback: (error: Error | null, user?: User) => void,
): void {
  setTimeout(() => {
    // ur actual api call
    const user = users.find((currentUser) => currentUser.id === userId);
    if (!user) {
      callback(new Error(`user with id ${userId} was not found`));
      return;
    }
    callback(null, user);
  }, 500);
}
// inline callback function
// finduserWithCallback(10, (error, user) => {
//   if (error) {
//     console.log("callback error:", error.message);
//     return;
//   }
//   console.log("callback user:", user?.id, user?.name, user?.role);
// });

// we can also use a named function as a callback
// with the helper function we can reuse the same callback logic in multiple places
function callBackHelper(error: Error | null, user?: User): void {
  if (error) {
    console.log("callback error:", error.message);
    return;
  }
  console.log("callback user:", user?.id, user?.name, user?.role);
}

finduserWithCallback(10, callBackHelper);

// same example with promises
function findUserWithPromise(userId: number): Promise<User> {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      let user = users.find((res) => res.id === userId);
      if (!user) {
        reject(new Error(`user with ${userId} Id was not found`));
        return;
      }
      reslove(user);
    }, 500);
  });
}

// calling the promise function
findUserWithPromise(10)
  .then((res) => {
    console.log("promise user:", res?.id, res?.name, res?.role);
  })
  .catch((err) => {
    console.log("promise error:", err.message);
  });
findUserWithPromise(1)
  .then((res) => {
    console.log("promise user:", res?.id, res?.name, res?.role);
  })
  .catch((err) => {
    console.log("promise error:", err.message);
  });

// aync await example
async function findUserwithAsyncAwait(userId: number): Promise<void> {
  try {
    const user = await findUserWithPromise(userId);
    console.log("async await user:", user?.id, user?.name, user?.role);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.log("async await error:", message);
  }
}
findUserwithAsyncAwait(2);
findUserwithAsyncAwait(10);
