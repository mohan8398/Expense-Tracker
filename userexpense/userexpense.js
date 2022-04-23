window.addEventListener('load', () => {
    pagination(1, 10);
    getExpenseFiles();
})

async function getParticularUserExpenses(res) {
    console.log("front end inside getParticularUserExpense function ")
    // const token = localStorage.getItem('authToken');
    // const res = await axios.get('http://localhost:3000/getParticularUserExpenses', { headers: { "Authorization": token } });
    


    const table = document.getElementById('table');
    table.innerHTML = `<tr class="header-row">
    <th class="header-item items">DATE</th>
    <th class="header-item items">DESCRIPTION</th>
    <th class="header-item items">CATEGORY</th>
    <th class="header-item items">INCOME</th>
    <th class="header-item items">EXPENSE</th>
  </tr>`+ '';
    // const headerRow = document.getElementsByClassName('header-row');
    // console.log('header row 0th element >>> ', headerRow[0]);
    // console.log('header row outer html >>> ' , headerRow.outerHTML);

    // const tableFirstElementChild = table.firstElementChild;
    // table.innerHTML = headerRow + '';
    // console.log("table oth element >>> ", table);
    // console.log("table child node >>> ", table.childNodes);
    // console.log("table first child>>> ", table.firstChild);
    // console.log("table first element child >>> ", table.firstElementChild);
    // console.log("table first element child >>> ", table.firstElementChild.firstElementChild);

    let count = 1;
    let tablerow = '';

    res.data.expenses.forEach((expense) => {

        tablerow = '';

        if (count % 2 == 0) {
            tablerow = `<tr class="table-rows" style="background-color: lightyellow;">
        <td class="items">${expense.createdAt}</td>
        <td class="items">${expense.description}</td>
        <td class="items icon">${expense.category}</td>
        <td class="items">0</td>
        <td class="items">${expense.amount}</td>
      </tr> `;
        } else {
            tablerow = `<tr class="table-rows" style="background-color: lightgray;">
        <td class="items">${expense.createdAt}</td>
        <td class="items">${expense.description}</td>
        <td class="items icon">${expense.category}</td>
        <td class="items">0</td>
        <td class="items">${expense.amount}</td>
      </tr> `;
        }

        table.innerHTML += tablerow;
        count++;

    });

    console.log('table after loop >> ', table);

    // console.log('res data >> ', res.data)
    const pagination = document.getElementById("pagination");
    // console.log('pagination >> ', pagination)
    // console.log('res pagination >>> ', res.data.pagination);
    pagination.classList.add('pagination');
    let paginationChild = "";

    if (res.data.pagination.hasPreviousPage) {
        paginationChild = `<span id="pagination" class="pagination" onclick=pagination(${res.data.pagination.previousPage})> ${res.data.pagination.previousPage} </span>`
    }
    if (res.data.pagination.hasNextPage) {
        paginationChild += `<span id="pagination" class="pagination" onclick=pagination(${res.data.pagination.nextPage})> ${res.data.pagination.nextPage} </span>`
    }

    pagination.innerHTML = paginationChild;

    // const tableid = document.getElementById('table');
    // console.log("table >>> ", tableId);


}

async function pagination(page) {
    const token = localStorage.getItem('authToken');
    const limit = localStorage.getItem('pagelimit');
    console.log('limit from local storage >> ', limit)
    const res = await axios.get(`http://localhost:3000/getParticularUserExpenses?page=${page}&limit=${limit}`, { headers: { "Authorization": token } });
    console.log('pagination res >>> ', res);
    getParticularUserExpenses(res);
}


async function verifyPremium() {
    // checkPremium
    console.log('leaderBoard button clicked')
    try {
        console.log('getting inside try block...')
        const token = localStorage.getItem('authToken');
        console.log('token >>>> ', token);
        const res = await axios.get("http://localhost:3000/checkPremium", { headers: { "Authorization": token } });
        console.log("response  >>> ", res);
        console.log("response data status >>> ", res.status);
        if (res.status === 200) {
            const res = await axios.get("http://localhost:3000/download", { headers: { "Authorization": token } });

            console.log("response from download backend >>> ", res);
            // location.href = res.data.url;
            getExpenseFiles();
        }
    }
    catch (err) {
        // console.log(err);
        alert("This feature available only for premium members");
    }

}


async function getExpenseFiles() {
    const list = document.getElementById("file-list");
    console.log('list >>> ', list);
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.get("http://localhost:3000/getexpensefile", { headers: { "Authorization": token } });
        res.data.files.forEach(file => {
            let tmp = `
            <li class="files">  <a href=${file.url}>${file.name} </a>&emsp;<span>${file.createdAt}</span></li> <br>
            `
            list.innerHTML += tmp;
        });


    } catch (err) {
        console.log(err);
    }
}


function getDialogValue() {
    const select = document.getElementById('page');
    const limit = select.value;
    // pagination(limit)
    localStorage.setItem("pagelimit", limit)
    pagination(1);

}

