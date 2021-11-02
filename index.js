async function showItems() {
  let elem = document.querySelector(".reviews");
  await renderUsers();
  if (elem.style.display != "grid") {
    elem.style.display = "grid";
  }
}

let showButton = document.querySelector(".header__button");
showButton.addEventListener("click", () => showItems());

let previousButton = document.querySelector(".previous");
previousButton.addEventListener("click", () => location.assign(history.back()));

let nextButton = document.querySelector(".next");
nextButton.addEventListener("click", () => location.assign(history.forward()));

async function getUser() {
  let url = "https://random-data-api.com/api/users/random_user";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function getReview() {
  let url = "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

let fillUserData = async (user) => {
  userData = await getUser();
  userReview = await getReview();
  fullName = user.querySelector(".client__info__main__name");
  img = user.querySelector(".client__photo > img ");
  position = user.querySelector(".client__info__main__position");
  review = user.querySelector(".client__review");

  fullName.innerHTML = `${userData.first_name} ${userData.last_name}`;
  img.setAttribute("src", userData.avatar);
  position.innerHTML = userData.employment.title;
  review.innerHTML = userReview.very_long_sentence;
};

async function renderUsers() {
  let usersElements = document.querySelectorAll(".client");

  for (let userIndex = 0; userIndex < usersElements.length; userIndex++) {
    await fillUserData(usersElements[userIndex]);
  }
}
