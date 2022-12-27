function trimAllStrings(body: any) {
  for (let key in body) {
    if (typeof body[key] === "string") {
      console.log(body[key]);
      body[key] = body[key].trimEnd().trimStart();
      console.log(body[key]);
    }
  }

  return body;
}

export { trimAllStrings };
