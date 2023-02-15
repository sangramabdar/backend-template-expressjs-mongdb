function trimAllStrings(body: any) {
  for (let key in body) {
    if (typeof body[key] === "string") {
      body[key] = body[key].trimEnd().trimStart();
    }
  }

  return body;
}

export { trimAllStrings };
