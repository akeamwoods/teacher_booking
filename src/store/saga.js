export function* exampleSaga({ payload }) {
  try {
    yield console.log(payload);
  } catch (err) {
    console.log(err);
  }
}
