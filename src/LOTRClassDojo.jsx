import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teams = ["Elfos", "Enanos", "Hombres", "Magos"];

export default function LOTRClassDojo() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [newName, setNewName] = useState("");
  const [team, setTeam] = useState(teams[0]);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const playSound = (type) => {
    const audio = new Audio(
      type === "good"
        ? "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        : "https://actions.google.com/sounds/v1/cartoon/sad_trombone.ogg"
    );
    audio.play();
  };

  const addStudent = () => {
    if (!newName) return;
    setStudents([
      ...students,
      {
        name: newName,
        points: 0,
        team,
        avatar: `https://api.dicebear.com/7.x/fantasy/svg?seed=${newName}`
      }
    ]);
    setNewName("");
  };

  const updatePoints = (index, delta) => {
    const updated = [...students];
    updated[index].points += delta;
    setStudents(updated);
    playSound(delta > 0 ? "good" : "bad");
  };

  const sorted = [...students].sort((a, b) => b.points - a.points);

  return (
    <div
      className="min-h-screen p-6 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="bg-black/70 p-4 rounded-2xl">
        <h1 className="text-3xl text-center font-bold mb-4">
          🧙‍♂️ Academia de la Tierra Media
        </h1>

        {/* Añadir alumno */}
        <div className="flex gap-2 mb-4">
          <input
            className="p-2 rounded text-black flex-1"
            placeholder="Nombre del aventurero"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <select
            className="text-black p-2 rounded"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          >
            {teams.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <Button onClick={addStudent}>Añadir</Button>
        </div>

        {/* Ranking */}
        <div className="grid gap-4 md:grid-cols-3">
          {sorted.map((student, index) => (
            <Card key={index} className="bg-gray-900/90 rounded-2xl">
              <CardContent className="p-4 text-center">
                <img
                  src={student.avatar}
                  alt="avatar"
                  className="w-20 h-20 mx-auto mb-2 rounded-full"
                />

                <h2 className="text-xl font-bold">{student.name}</h2>
                <p className="text-sm opacity-70">{student.team}</p>

                <p className="text-4xl my-2">{student.points} ⚔️</p>

                <div className="flex justify-center gap-2">
                  <Button onClick={() => updatePoints(index, 1)}>➕</Button>
                  <Button onClick={() => updatePoints(index, -1)}>➖</Button>
                </div>

                {index === 0 && (
                  <p className="text-yellow-400 font-bold mt-2">
                    👑 Portador del Anillo
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}