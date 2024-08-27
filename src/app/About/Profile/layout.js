export default function profileLayout({ children }) {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>My Profile Page</h1>
      {children}
      <h1>My Profile Page End</h1>
    </main>
  );
}
