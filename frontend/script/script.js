const events = [
    {
        title: "JavaScript Conference",
        description: "A conference for JavaScript developers to learn and network.",
        date: "12-March-2023 09:00",
        year: 2023,
        mode: "in person",
        category: "technology",
        location: "Lahore"
    },
    {
        title: "React Workshop",
        description: "A hands-on workshop to learn React and build a project.",
        date: "25-June-2023 10:00",
        year: 2023,
        mode: "online",
        category: "technology",
        location: "Karachi"
    },
    {
        title: "Web Development Meetup",
        description: "A meetup for web developers to discuss latest trends and technologies.",
        date: "10-August-2023 14:00",
        year: 2023,
        mode: "in person",
        category: "technology",
        location: "Islamabad"
    },
    {
        title: "Angular Summit",
        description: "A summit for Angular developers to learn and share knowledge.",
        date: "15-October-2023 09:30",
        year: 2023,
        mode: "online",
        category: "technology",
        location: "Peshawar"
    },
    {
        title: "Full Stack Development Bootcamp",
        description: "A bootcamp to learn full stack development and build a project.",
        date: "1-December-2023 10:30",
        year: 2023,
        mode: "in person",
        category: "technology",
        location: "Quetta"
    },
    {
        title: "Time Management Workshop",
        description: "A workshop to learn effective time management techniques.",
        date: "20-January-2023 11:00",
        year: 2023,
        mode: "online",
        category: "productivity",
        location: "Multan"
    },
    {
        title: "Goal Setting Seminar",
        description: "A seminar to learn how to set and achieve goals.",
        date: "15-February-2023 14:30",
        year: 2023,
        mode: "in person",
        category: "productivity",
        location: "Faisalabad"
    },
    {
        title: "Mindfulness and Meditation Retreat",
        description: "A retreat to learn mindfulness and meditation techniques.",
        date: "1-April-2023 09:00",
        year: 2023,
        mode: "in person",
        category: "productivity",
        location: "Hyderabad"
    },
    {
        title: "Astrophysics Conference",
        description: "A conference to discuss the latest developments in astrophysics.",
        date: "10-May-2023 10:00",
        year: 2023,
        mode: "in person",
        category: "science",
        location: "Lahore"
    },
    {
        title: "Biology Workshop",
        description: "A workshop to learn about the latest developments in biology.",
        date: "1-June-2023 11:30",
        year: 2023,
        mode: "online",
        category: "science",
        location: "Karachi"
    },
    {
        title: "Environmental Science Seminar",
        description: "A seminar to discuss the latest developments in environmental science.",
        date: "15-July-2023 14:00",
        year: 2023,
        mode: "in person",
        category: "science",
        location: "Islamabad"
    },
    {
        title: "Artificial Intelligence Summit",
        description: "A summit to discuss the latest developments in artificial intelligence.",
        date: "20-August-2023 09:30",
        year: 2023,
        mode: "online",
        category: "technology",
        location: "Peshawar"
    },
    {
        title: "Cybersecurity Conference",
        description: "A conference to discuss the latest developments in cybersecurity.",
        date: "1-September-2023 10:30",
        year: 2023,
        mode: "in person",
        category: "technology",
        location: "Quetta"
    },
    {
        title: "Data Science Workshop",
        description: "A workshop to learn about the latest developments in data science.",
        date: "10-October-2023 11:00",
        year: 2023,
        mode: "online",
        category: "technology",
        location: "Multan"
    }
];
let eventContainer = document.querySelector('#event-containers');
const typeSelect = document.querySelector('.type-form:first-of-type');
const categorySelect = document.querySelector('.category-form:last-of-type');
const citySelect = document.querySelector('.city-form:last-of-type');
const resetFilter = document.querySelector(".reset-btn");
//modal 

var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
const modalTitle = document.getElementById("event-title");
const modalDescription = document.getElementById("event-description");
const modalDate = document.getElementById("event-date");
const modalMode = document.getElementById("event-mode");
const modalLocation = document.getElementById("event-location");
const modalCategory = document.getElementById("event-category");


console.log(modal)

const savedEventsContainer = document.querySelector('.saved-events-container')
let savedEvents = [];
const regEventContainer = document.querySelector('.registered-events-container');
let regEvents = [];
let saveBtn
let closeBtn
let regCloseBtn
let attendBtn
// console.log(saveBtn)

addEventAttendBtn = () => {
    attendBtn.addEventListener('click', () => {
        console.log('clicked');
        let attendBox = document.querySelector('.attendee-box');


        // Get the event title from the modal
        const eventTitle = modalTitle.textContent;
        // Find the corresponding event object in the `events` array
        const eventObject = events.find(e => e.title === eventTitle);
        // Check if the event exists and if it's not already registered
        if (eventObject && !regEvents.some(e => e.title === eventTitle)) {
            // Add the event to the `regEvents` array
                    // Create a new div element from the string
        let newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="card participant-card" style="width:200px">
                <div class="card-body text-center">
                    <img src="images/profile.jpg" class="rounded-circle img-fluid profile-picture" alt="...">
                    <h5 class="card-title attendee-name fw-bold">Shivam</h5>
                    <p class="card-subtitle mb-2 text-muted">Attendee</p>
                </div>
            </div>
        `;

        // Append the newly created element
        attendBox.append(newElement);
            regEvents.push(eventObject);
            // Update the registered events display
            regEventsPopulate();
            // Remove the event listener to prevent adding the same event multiple times
            attendBtn.removeEventListener('click', addEventAttendBtn);
        } else {
            console.log('Event already registered!');
        }
    });
};
// function for adding the selected event to registered event container 
// addAttendBtnReg = () => {
//     attendBtn.addEventListener('click', () => {
//         console.log('clicked');
//         // Get the event title from the modal
//         const eventTitle = modalTitle.textContent;
//         // Find the corresponding event object in the `events` array
//         const eventObject = events.find(e => e.title === eventTitle);
//         // Check if the event exists and if it's not already registered
//         if (eventObject && !regEvents.some(e => e.title === eventTitle)) {
//             // Add the event to the `regEvents` array
//             regEvents.push(eventObject);
//             // Update the registered events display
//             regEventsPopulate();
//         } else {
//             console.log('Event already registered!');
//         }
//     });
// };

let titleEventLinks = () => {
    let titleLinks = document.querySelectorAll('.event-title-link');
    // console.log(titleLinks)
    titleLinks.forEach((tl) => {
        tl.addEventListener('click', (para) => {
            let eventTitle = para.target.textContent;
            let eventObject = events.find(e => e.title === eventTitle); // Use find instead of filter to get a single object
            if (eventObject) {
                showModal(eventObject); // Pass the single event object to showModal
            }
        })
    })
}

const showModal = (event) => {


    modalTitle.textContent = event.title;
    modalDescription.textContent = event.description;
    modalDate.textContent = event.date;
    modalMode.textContent = `Type: ${event.mode}`;
    modalLocation.textContent = `Location: ${event.location}`;
    modalCategory.textContent = `Category: ${event.category}`;
    console.log(event)
    attendBtn = document.querySelector('.attend-btn');
    console.log(attendBtn)
    addEventAttendBtn()
    modal.show();
};



//registered event close button
let loadCloseBtnRegEvents = () => {
   
    regCloseBtn.forEach((e) => {
        e.addEventListener('click', (ev) => {
            console.log('close registered event')
            const card = ev.target.closest('.card');
            console.log(card)
            removeItem = card.querySelector(".card-title").textContent;
            regEvents = regEvents.filter((event) => event.title !== removeItem);
            regEventsPopulate();
        })
    })
    if (regEvents.length == 0) {
        regEventContainer.innerHTML = `    <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">You have not any registerd event</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Events you have registered for will appear
                                    here.
                                </h6>

                            </div>
                        </div>`
    }
}



// Function to populate the registered events container
const regEventsPopulate = () => {
    regEventContainer.innerHTML = ""; // Clear the container
    if (regEvents.length == 0) {
        regEventContainer.innerHTML = `    <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">You have not any registerd event</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Events you have registered for will appear
                                    here.
                                </h6>

                            </div>
                        </div>`
    } else {
        // Loop through the `regEvents` array and create card elements for each event
        regEvents.forEach((e) => {
            let element = `
    
<div class="card mb-3 position-relative" >
    <div class="row g-0">
      
      <div class="col-12">
        <div class="card-body">
    <div class="d-flex flex-wrap justify-content-between gap-2">
        <h5 class="card-title event-title-link">${e.title}</h5>        
       
        <div class = "position-absolute top-0 end-0 p-3">
            <img src="images/close-icon.svg" width="20px" class="ms-auto close-btn regCloseBtn" alt="">
        </div>
    </div>
 <p class="card-text mb-0"><small class="text-muted"> Date: ${e.date}</small></p>
          <p class="card-text">${e.description}</p>
       
        </div>
      </div>
    </div>
  </div>
    `
            regEventContainer.innerHTML += element;
        })
    }

    // Add event listeners to close buttons in registered events
    regCloseBtn = document.querySelectorAll(".regCloseBtn");
    loadCloseBtnRegEvents();
    titleEventLinks(); // Add event listeners to title links
};

 // function to remove registered event 
//  let loadCloseBtnRegEvents = () => {
//     closeBtn.forEach((e) => {
//         e.addEventListener('click', (ev) => {
//             const card = ev.target.closest('.card');
//             removeItem = card.querySelector(".card-title").textContent;
//             // Remove the event from the `regEvents` array
//             regEvents = regEvents.filter((event) => event.title !== removeItem);
//             // Update the registered events display
//             regEventsPopulate();
//         })
//     })
//     // Check if there are no registered events and display a message
//     if (regEvents.length == 0) {
//         regEventContainer.innerHTML = `    <div class="card">
//                             <div class="card-body text-center">
//                                 <h5 class="card-title">You have not any registerd event</h5>
//                                 <h6 class="card-subtitle mb-2 text-muted">Events you have registered for will appear
//                                     here.
//                                 </h6>

//                             </div>
//                         </div>`
//     }
// }



    let loadCloseBtnEvents = () => {
        closeBtn.forEach((e) => {
            e.addEventListener('click', (ev) => {
                const card = ev.target.closest('.card');
                removeItem = card.querySelector(".card-title").textContent;
                savedEvents = savedEvents.filter((event) => event.title !== removeItem);
                savedEventsPopulate();
            })
        })
        if (savedEvents.length == 0) {
            savedEventsContainer.innerHTML = `  <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">You have not any Saved event</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Events you have Saved for will appear here.
                                </h6>

                            </div>
                        </div>`
        }
    }

    let savedEventsPopulate = () => {

        savedEventsContainer.innerHTML = "";
        savedEvents.forEach((e) => {
            let element = `
    
<div class="card mb-3 position-relative" >
    <div class="row g-0">
      
      <div class="col-12">
        <div class="card-body">
    <div class="d-flex flex-wrap justify-content-between gap-2">
        <h5 class="card-title event-title-link">${e.title}</h5>        
       
        <div class = "position-absolute top-0 end-0 p-3">
            <img src="images/close-icon.svg" width="20px" class="ms-auto close-btn" alt="">
        </div>
    </div>
 <p class="card-text mb-0"><small class="text-muted"> Date: ${e.date}</small></p>
          <p class="card-text">${e.description}</p>
       
        </div>
      </div>
    </div>
  </div>
    `
            savedEventsContainer.innerHTML += element;
        })

        closeBtn = document.querySelectorAll(".close-btn");
        loadCloseBtnEvents();
        titleEventLinks();
    }
    let loadEventListenersSave = () => {
        saveBtn.forEach((e) => {
            e.addEventListener('click', (event) => {

                const card = event.target.closest('.card');
                const eventInfo = {
                    title: card.querySelector('.card-title').textContent,
                    date: card.querySelector('.card-date').textContent,
                    description: card.querySelector('.card-desc').textContent,
                };

                const existingEvent = savedEvents.find((e) => e.title === eventInfo.title);
                if (!existingEvent) {
                    savedEvents.push(eventInfo);
                    savedEventsPopulate(savedEvents);
                    console.log(savedEvents);
                } else {
                    console.log('Event already saved!');
                }
            });
        });
        // titleEventLinks();
    }
    resetFilter.addEventListener('click', () => {
        populateEvent(events);
        typeSelect.value = "any";
        categorySelect.value = "any";
        citySelect.value = "any";
    })


    // console.log(eventContainer)
    console.log('hello')

    const populateEvent = (events) => {
        eventContainer.innerHTML = "";
        if (events.length === 0) {
            eventContainer.innerHTML = "<p>No events found</p>";
        } else {
            events.forEach((e) => {
                let element = `                <div class="card mb-3 border-0 pb-4 pt-2 border-bottom border-muted" >
                                      <div class="row g-0">
                                        <div class="col-md-4">
                                          <img src="images/logo.png" class="img-fluid rounded-start" alt="...">
                                        </div>
                                        <div class="col-md-8">
                                          <div class="card-body ">
                                           <div class="d-flex gap-3">
                                           <h5 class="card-title event-title-link">${e.title}</h5>
                                            <p class="card-text mb-0 card-date"><small class="text-muted"> ${e.date}</small></p>
                                           </div>


                                            <p class="card-text card-desc">${e.description}</p>
                                            <div class="d-flex flex-wrap gap-2">
                                            <p class="card-text mb-0"><small class="text-muted">Type : ${e.mode}</small></p>
                                            <p class="card-text mb-0"><small class="text-muted">Location : ${e.location}</small></p>
                                            <p class="card-text mb-0"><small class="text-muted">Category : ${e.category}</small></p>
                                            </div>
                                            <div class="d-flex justify-content-end">
                                           <button type="button" class="btn save-btn px-3 me-4 mt-3 ">Save</button>
                                           </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>`;
                eventContainer.innerHTML += element;
            });
        }

        saveBtn = document.querySelectorAll(".save-btn");
        titleEventLinks();
        loadEventListenersSave();
        console.log(saveBtn)

    };
    populateEvent(events);



    const filterEvent = () => {
        const selectedCategory = categorySelect.value;
        const selectedMode = typeSelect.value;
        const selectedCity = citySelect.value;
        let filteredEvents = events;

        if (selectedCategory !== "any") {
            filteredEvents = filteredEvents.filter((event) => event.category === selectedCategory);
        }

        if (selectedMode !== "any") {
            filteredEvents = filteredEvents.filter((event) => event.mode === selectedMode);
        }

        if (selectedCity !== "any") {
            filteredEvents = filteredEvents.filter((event) => event.location === selectedCity);
        }

        populateEvent(filteredEvents);
    }

    typeSelect.addEventListener('change', filterEvent);
    categorySelect.addEventListener('change', filterEvent);
    citySelect.addEventListener('change', filterEvent);











    const form = document.querySelector('form');
    const searchInput = document.querySelector('.search-bar-event');
    const cityInput = document.querySelector('.search-bar-city');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent the form from submitting
        const searchTerm = searchInput.value.trim();
        const cityTerm = cityInput.value.trim();
        const filteredEvents = events.filter((event) => {
            const titleMatch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
            const descriptionMatch = event.description.toLowerCase().includes(searchTerm.toLowerCase());
            const cityMatch = event.city === cityTerm; // assuming you have a city property in your events object
            return titleMatch || descriptionMatch || cityMatch;
        });
        populateEvent(filteredEvents);
    });