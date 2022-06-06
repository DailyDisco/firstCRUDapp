const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')

    // this adds a click event so that we can
        // send the data when the button is clicked.
update.addEventListener('click', _ => {
  
    // Send PUT Request here
  // the easiest way to send a PUT request is to use the Fetch API
  fetch('/quotes', {

      method: 'put',
        // this sends the PUT request

       headers: { 'Content-Type': 'application/json' },
        // this tells the sever we are sending JSON data

        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
                // this converts the data into JSON
        })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })

})



deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          name: 'Darth Vader'
          // this allows us to search for the first quote from the name with the value of 'Darth Vader'  
      })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })
})