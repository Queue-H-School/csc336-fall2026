let todoForm = document.getElementById("todoForm");
todoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let todoText = {
        todoText: document.querySelector("#todoTextInput").value
    }
    // clear input
    document.getElementById("todoTextInput").value = "";

    await fetch("/api/todos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(todoText)
    });
});