import json
import random
def findsamples():
    samplequestions = []
    questions = []
    with open('augmented_startup_updated_qs.json') as file:
        jsondata = json.loads(file.read())
        file.close()
    data = jsondata['data'][0]['paragraphs'][0]['qas']

    for i in data:
        questions.append(i['question'])
    for i in range(10):
        choice = random.choice(questions)
        while(choice in samplequestions):
            choice = random.choice(questions)
        samplequestions.append(choice)
    return samplequestions

