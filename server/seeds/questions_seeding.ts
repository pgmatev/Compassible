import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("questions").del();

  // Inserts seed entries
  await knex("questions").insert([
    {
      id: 1,
      question:
        "Which of these fruits do you like the best: apples, bananas, or strawberries?",
    },
    {
      id: 2,
      question:
        "If you could only eat one cuisine for the rest of your life, would you choose Italian, Mexican, or Chinese?",
    },
    {
      id: 3,
      question:
        "Would you prefer to spend a day at the beach, hiking in the mountains, or exploring a city?",
    },
    {
      id: 4,
      question:
        "If you could time travel, would you go to the past, the future, or stay in the present?",
    },
    {
      id: 5,
      question:
        "Do you prefer watching movies, reading books, or playing video games in your free time?",
    },
    {
      id: 6,
      question:
        "Which season do you enjoy the most: summer, autumn, winter, or spring?",
    },
    {
      id: 7,
      question:
        "Would you rather have the ability to fly, be invisible, or time travel?",
    },
    {
      id: 8,
      question:
        "If you could have any superpower, would you choose super strength, telekinesis, or the ability to heal others?",
    },
    {
      id: 9,
      question:
        "Which type of music do you prefer: pop, rock, hip-hop, or classical?",
    },
    {
      id: 10,
      question:
        "If you could visit any fictional world, would you choose Hogwarts, Middle Earth, or the Star Wars universe?",
    },
    {
      id: 11,
      question:
        "Which animal would you rather be: a lion, an eagle, or a dolphin?",
    },
    {
      id: 12,
      question:
        "Would you prefer to live in a bustling city, a quiet countryside, or a coastal town?",
    },
    {
      id: 13,
      question:
        "If you could have any job for a day, would you be an astronaut, a chef, or a professional athlete?",
    },
    {
      id: 14,
      question:
        "Which would you rather do on a weekend: go hiking, have a movie marathon, or attend a music festival?",
    },
    {
      id: 15,
      question:
        "If you could only keep one form of social media, would you choose Facebook, Instagram, or Twitter?",
    },
    {
      id: 16,
      question: "Do you prefer coffee, tea, or hot chocolate?",
    },
    {
      id: 17,
      question: "Would you rather have a pet dog, cat, or bird?",
    },
    {
      id: 18,
      question:
        "If you could learn any language fluently, would you choose French, Mandarin, or Spanish?",
    },
    {
      id: 19,
      question:
        "Which fictional character would you want as your best friend: Harry Potter, Sherlock Holmes, or Batman?",
    },
    {
      id: 20,
      question:
        "If you could have dinner with any historical figure, would you choose Albert Einstein, Leonardo da Vinci, or Cleopatra?",
    },
  ]);

  await knex("answers").del();

  await knex("answers").insert([
    {
      id: 1,
      answer: "apples",
      question_id: 1,
    },
    {
      id: 2,
      answer: "bananas",
      question_id: 1,
    },
    {
      id: 3,
      answer: "strawberries",
      question_id: 1,
    },
    {
      id: 4,
      answer: "Italian",
      question_id: 2,
    },
    {
      id: 5,
      answer: "Mexican",
      question_id: 2,
    },
    {
      id: 6,
      answer: "Chinese",
      question_id: 2,
    },
    {
      id: 7,
      answer: "beach",
      question_id: 3,
    },
    {
      id: 8,
      answer: "mountains",
      question_id: 3,
    },
    {
      id: 9,
      answer: "city",
      question_id: 3,
    },
    {
      id: 10,
      answer: "past",
      question_id: 4,
    },
    {
      id: 11,
      answer: "future",
      question_id: 4,
    },
    {
      id: 12,
      answer: "present",
      question_id: 4,
    },
    {
      id: 13,
      answer: "movies",
      question_id: 5,
    },
    {
      id: 14,
      answer: "books",
      question_id: 5,
    },
    {
      id: 15,
      answer: "video games",
      question_id: 5,
    },
    {
      id: 16,
      answer: "summer",
      question_id: 6,
    },
    {
      id: 17,
      answer: "autumn",
      question_id: 6,
    },
    {
      id: 18,
      answer: "winter",
      question_id: 6,
    },
    {
      id: 19,
      answer: "fly",
      question_id: 7,
    },
    {
      id: 20,
      answer: "invisible",
      question_id: 7,
    },
    {
      id: 21,
      answer: "time travel",
      question_id: 7,
    },
    {
      id: 22,
      answer: "super strength",
      question_id: 8,
    },
    {
      id: 23,
      answer: "telekinesis",
      question_id: 8,
    },
    {
      id: 24,
      answer: "heal others",
      question_id: 8,
    },
    {
      id: 25,
      answer: "pop",
      question_id: 9,
    },
    {
      id: 26,
      answer: "rock",
      question_id: 9,
    },
    {
      id: 27,
      answer: "hip-hop",
      question_id: 9,
    },
    {
      id: 28,
      answer: "Hogwarts",
      question_id: 10,
    },
    {
      id: 29,
      answer: "Middle Earth",
      question_id: 10,
    },
    {
      id: 30,
      answer: "Star Wars universe",
      question_id: 10,
    },
    {
      id: 31,
      answer: "lion",
      question_id: 11,
    },
    {
      id: 32,
      answer: "eagle",
      question_id: 11,
    },
    {
      id: 33,
      answer: "dolphin",
      question_id: 11,
    },
    {
      id: 34,
      answer: "bustling city",
      question_id: 12,
    },
    {
      id: 35,
      answer: "quiet countryside",
      question_id: 12,
    },
    {
      id: 36,
      answer: "coastal town",
      question_id: 12,
    },
    {
      id: 37,
      answer: "astronaut",
      question_id: 13,
    },
    {
      id: 38,
      answer: "chef",
      question_id: 13,
    },
    {
      id: 39,
      answer: "professional athlete",
      question_id: 13,
    },
    {
      id: 40,
      answer: "go hiking",
      question_id: 14,
    },
    {
      id: 41,
      answer: "have a movie marathon",
      question_id: 14,
    },
    {
      id: 42,
      answer: "attend a music festival",
      question_id: 14,
    },
    {
      id: 43,
      answer: "Facebook",
      question_id: 15,
    },
    {
      id: 44,
      answer: "Instagram",
      question_id: 15,
    },
    {
      id: 45,
      answer: "Twitter",
      question_id: 15,
    },
    {
      id: 46,
      answer: "coffee",
      question_id: 16,
    },
    {
      id: 47,
      answer: "tea",
      question_id: 16,
    },
    {
      id: 48,
      answer: "hot chocolate",
      question_id: 16,
    },
    {
      id: 49,
      answer: "dog",
      question_id: 17,
    },
    {
      id: 50,
      answer: "cat",
      question_id: 17,
    },
    {
      id: 51,
      answer: "bird",
      question_id: 17,
    },
    {
      id: 52,
      answer: "French",
      question_id: 18,
    },
    {
      id: 53,
      answer: "Mandarin",
      question_id: 18,
    },
    {
      id: 54,
      answer: "Spanish",
      question_id: 18,
    },
    {
      id: 55,
      answer: "Harry Potter",
      question_id: 19,
    },
    {
      id: 56,
      answer: "Sherlock Holmes",
      question_id: 19,
    },
    {
      id: 57,
      answer: "Batman",
      question_id: 19,
    },
    {
      id: 58,
      answer: "Albert Einstein",
      question_id: 20,
    },
    {
      id: 59,
      answer: "Leonardo da Vinci",
      question_id: 20,
    },
    {
      id: 60,
      answer: "Cleopatra",
      question_id: 20,
    },
  ]);
}
