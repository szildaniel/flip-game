export function seperateCookies() {
  const cookiesObject = Object.fromEntries(
    document.cookie.split("; ").map((c) => {
      const [key, ...v] = c.split("=");
      return [key, v.join("=")];
    })
  );

  return cookiesObject;
}
