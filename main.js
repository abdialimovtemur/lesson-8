const box = document.querySelector(".box");
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".inputs")


const render = (data) => {
    box.innerHTML = data.map((item) => `<h1>${item.title}</h1>
    <h2>${item.description}</2>
    <button class="text-white bg-red-600 rounded-sm p-2" data-id="${item.id}">delete</button>
    `
    );
};


const getData = () => {
    fetch("http://localhost:3000/todos")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            render(data);
        })
        .catch((error) => {
            console.log(error)
        })
};

getData()




box.addEventListener("click", (e) => {
    const deleteItem = e.target.dataset.id;
    if (deleteItem) {
        fetch(`http://localhost:3000/todos/${deleteItem}`, {
            method: "DELETE",
        }).then((res) => {
            return res.json();
        })
            .then(() => {
                 getData();
            })
    }
});







form.addEventListener("submit", (e) => {
    e.preventDefault();
    let obj = {}
    for (let i of inputs) {
        obj[i.name] = i.value
        i.value = "";
    }
    fetch("http://localhost:3000/todos", {
        headers:{
            "Content-Type": "application/json",
        },
        method:"POST",
        body:JSON.stringify(obj),
    }).then((res)=> res.json()).then((data) =>{
        console.log(data)
    })
})