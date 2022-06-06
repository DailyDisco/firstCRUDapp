const update = document.querySelector('#update-button')
    // this adds a click event so that we can
        // send the data when the button is clicked.
update.addEventListener('click', _ => {
  
    // Send PUT Request here
  // the easiest way to send a PUT request is to use the Fetch API
  fetch('/quotes', {

      method: 'put'
        // this sends the PUT request

       headers: { 'Content-Type': 'application/json' },
        // this tells the sever we are sending JSON data

        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
            
        })
  })
})