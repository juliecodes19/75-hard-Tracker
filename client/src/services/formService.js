async function postWorkout(
  startTime,
  endTime,
  session,
  location,
  exerciseType,
  sets,
  reps,
  notes
) {
  try {
    const response = await fetch(`http://localhost:3000/workout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sartTime: startTime,
        endTime: endTime,
        session: session,
        location: location,
        exerciseType: exerciseType,
        sets: sets,
        reps: reps,
        notes: notes,
      }),
    });
    const event = await response.json();
    return event;
  } catch (e) {
    console.log(e);
  }
}

export { postWorkout };
