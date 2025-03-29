const ACTIVE_SKILL = "skill-active";
const FILTER_HIDDEN = "filter-hidden";
const REMOVE_TAG = "remove-tag";
const SKILL = "skill";

function getTagHTML(tag, tagClasses) {
  return `<span class="${tagClasses}">${tag}</span>`;
}

function toggleClass(el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
    return;
  }
  el.classList.add(className);
}

function getFilterTags(tagValue, filterTagsEl) {
  let filterTags = Array.from(filterTagsEl.children)
    .map((node) => node.innerHTML && node.innerHTML.trim())
    .filter((tag) => !!tag);

  if (filterTags.includes(tagValue)) {
    filterTags = filterTags.filter((tag) => tag !== tagValue);
  } else {
    filterTags = [...filterTags, tagValue];
  }

  return filterTags;
}

function setJobList(filterTags) {
  const jobItems = document.querySelectorAll(".job");
  jobItems.forEach((item) => {
    const skills = Array.from(item.querySelectorAll(".skill")).map((skill) =>
      skill.innerHTML.toLowerCase()
    );
    const passesFilter =
      !filterTags.length ||
      filterTags.every((tag) => skills.includes(tag.toLowerCase()));

    item.style.display = passesFilter ? "" : "none";
  });
}

function showFilterBar(display = false) {
  const filterBar = document.getElementById("filter-bar");
  filterBar.classList.toggle(FILTER_HIDDEN, !display);
}

function setFilterTags(filterTagsEl, tags) {
  filterTagsEl.innerHTML = tags.reduce((acc, currentTag) => {
    return acc + getTagHTML(currentTag, REMOVE_TAG);
  }, "");
}

function resetFilter(filterTagsEl) {
  filterTagsEl.innerHTML = "";
  setJobList([]);
  showFilterBar(false);
}

window.addEventListener("click", (event) => {
  const targetEl = event.target;
  const targetText = targetEl.innerHTML.trim();
  const filterTagsEl = document.getElementById("filter-tags");
  const filterTags = getFilterTags(targetText, filterTagsEl);

  if (targetEl.id === "clear-btn" || !filterTags.length) {
    resetFilter(filterTagsEl);
    return;
  }

  if (![SKILL, REMOVE_TAG].some((c) => targetEl.classList.contains(c))) {
    return;
  }

  setFilterTags(filterTagsEl, filterTags);
  toggleClass(targetEl, ACTIVE_SKILL);
  showFilterBar(filterTags.length > 0);
  setJobList(filterTags);
});

setJobList([]);
