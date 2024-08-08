let books = [
	{ title: "Книга 1", author: "Автор 1", year: 2020, available: true },
	{ title: "Книга 2", author: "Автор 2", year: 2018, available: true },
	{ title: "Книга 3", author: "Автор 1", year: 2021, available: true },
];

let isAdmin = false;

function toggleAdmin() {
	isAdmin = !isAdmin;
	document.getElementById("admin-interface").style.display = isAdmin ? "block" : "none";
	document.getElementById("user-interface").style.display = isAdmin ? "none" : "block";
	renderBooks();
}

function renderBooks() {
	const bookList = document.getElementById("book-list");
	const adminBookList = document.getElementById("admin-book-list");
	bookList.innerHTML = "";
	adminBookList.innerHTML = "";

	books.forEach((book, index) => {
		const bookDiv = document.createElement('div');
		bookDiv.className = "book";
		bookDiv.innerHTML = `
            <strong>${book.title}</strong><br>
            Автор: ${book.author}<br>
            Год: ${book.year}<br>
            Доступно: ${book.available ? "Да" : "Нет"}<br>
            <button onclick="rentBook(${index})">Арендовать</button>
        `;
		bookList.appendChild(bookDiv);

		if (isAdmin) {
			const adminDiv = document.createElement('div');
			adminDiv.className = "book";
			adminDiv.innerHTML = `
                <strong>${book.title}</strong><br>
                Автор: ${book.author}<br>
                Год: ${book.year}<br>
                Доступно: ${book.available ? "Да" : "Нет"}<br>
                <button onclick="deleteBook(${index})">Удалить</button>
            `;
			adminBookList.appendChild(adminDiv);
		}
	});
}

function sortBooks() {
	const sortBy = document.getElementById("sort-select").value;
	books.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
	renderBooks();
}

function addBook() {
	const title = document.getElementById("new-book-title").value;
	const author = document.getElementById("new-book-author").value;
	const year = parseInt(document.getElementById("new-book-year").value, 10);

	if (title && author && year) {
		books.push({ title, author, year, available: true });
		renderBooks();
	} else {
		alert("Пожалуйста, заполните все поля!");
	}
}

function deleteBook(index) {
	books.splice(index, 1);
	renderBooks();
}

function rentBook(index) {
	if (books[index].available) {
		books[index].available = false;
		alert(`Вы успешно арендовали "${books[index].title}"!`);
	} else {
		alert(`Книга "${books[index].title}" недоступна для аренды!`);
	}
}

window.onload = renderBooks;