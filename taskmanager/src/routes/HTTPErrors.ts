export const NoIDError = Object.assign(new Error("No task with the given ID was found"), { status: 404 });