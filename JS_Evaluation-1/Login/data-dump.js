// data-dump.js

// Dummy users
const usersData = [
    {
      id: 1,
      username: "John Doe",
      email: "john.doe@bacancy.com",
      password: "John@123"
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "jane.smith@bacancy.com",
      password: "Jane@123"
    }
  ];
  
  // Dummy blog posts with comments
  const blogsData = [
    {
      id: 1,
      title: "Welcome to Vanilla JS",
      image: "../assets/card_image.jpg",
      content: "Vanilla JS is powerful when you use it right!",
      comments: [
        {
          username: "John Doe",
          content: "This is awesome!"
        },
        {
          username: "Jane Smith",
          content: "Very helpful post!"
        }
      ]
    },
    {
      id: 2,
      title: "Understanding localStorage",
      image: "../assets/card_image.jpg",
      content: "localStorage lets you store data that persists across reloads.",
      comments: []
    }
  ];
  
  // Save to localStorage only if not already present
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(usersData));
  }
  
  if (!localStorage.getItem("blogs")) {
    localStorage.setItem("blogs", JSON.stringify(blogsData));
  }
  
  console.log("Dummy data dumped into localStorage!");
  