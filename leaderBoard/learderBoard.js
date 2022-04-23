window.addEventListener("load", async () => {
    try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get("http://localhost:3000/getUserExpenses", { headers: { "Authorization": token } });
        if (res.status === 200) {
            renderLeaderboard(res.data.exp);
        }
    } catch (err) {
        console.log(err);
    }

})

function renderLeaderboard(expenses) {
    console.log('expenses >> ', expenses);
    const card = document.getElementsByClassName("score-card")[0];
    let cnt = 1;
    for (let user of Object.keys(expenses)) {
        const template = `
        <div class="leader">
            <div class="user">
                <div class="number">${cnt}</div>
            </div>
            <div class="user-info">
                <div class="user-name">${user}</div>
            </div>
            <div class="expense">
                <div class="expense-item">Rs. ${expenses[user]}</div>
            </div>
        </div>
        `
        cnt++;
        card.innerHTML += template;
    }
} 
