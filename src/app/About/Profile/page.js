async function TakeTime() {
  throw new Error("This is Manual Error");
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export default async function Profile() {
  await TakeTime();

  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page.</p>
    </div>
  );
}
