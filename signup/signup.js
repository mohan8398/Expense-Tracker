function signup(event) {
    event.preventDefault();
    console.log(event.target.name);
    const form = new FormData(event.target);

    const signupDetails = {
        name: form.get("name"),
        email: form.get("email"),
        phoneNo: form.get("phoneNO"),
        password: form.get("password")

    }
    console.log(signupDetails)
    axios.post('http://localhost:3000/user/signup',signupDetails).then(response => {
        if(response.status === 200){
            alert("Successfully Signed up")
        } else {
            throw new Error('Failed to login')
        }
    }).
    catch(event=>{
        alert("User already exists");
    })
}
