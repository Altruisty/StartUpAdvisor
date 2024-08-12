console.log(window.data)

let spacesforideas = document.getElementsByClassName('idea')

for(const i of spacesforideas){
    i.addEventListener('click',()=>{
        document.getElementById('question').value = i.innerText;
    })
}
setInterval(()=>{
    let ideas = Array.from(window.data);

    for(const i of spacesforideas){
        if(ideas.length==0){
            break
        }else{
               let index = Math.floor(Math.random()*ideas.length)
                i.innerText = ideas[index];
                ideas.splice(index,1)
        }



    }
},10000)

 async function askQuestion() {

                let ideas = document.getElementById('ideas')
                if(Array.from(document.body.children).includes(ideas)){
                     document.body.removeChild(ideas)
                }

                const question = document.getElementById('question').value;
                const responseDiv = document.getElementById('response');

                if (!question) {
                    window.alert('Please enter a question.');
                    return;
                }

                const response = await fetch('/answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question: question })
                });

                if (response.ok) {
                    const data = await response.json();
                    let questiondiv = document.getElementById('questiondiv');
                    if(!question.includes('?')){
                        questiondiv.innerText = `${question}?`
                    }

                    else{
                        questiondiv.innerText = question;
                    }
                     document.getElementById('question').value = ''
                    responseDiv.style.padding = '40px';
                    responseDiv.style.display = 'flex'
                    responseDiv.style.flexDirection = 'column'
                    responseDiv.style.justifyContent = 'center'
                    responseDiv.style.gap= '10px';
                    responseDiv.style.width = '80%';
                    questiondiv.style.padding = '10px';
                    responseDiv.style.height = '60%';
                    responseDiv.innerHTML+= `<br><strong>${data.correct_answer}</strong></br>`;

                } else {
                    responseDiv.innerHTML = 'Error fetching the answer. Please try again.';
                }
            }


document.getElementById('submitbtn').addEventListener('click',askQuestion)