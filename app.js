'use strict';

const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

let candidates = [];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/candidates', function(req, res) {
    console.log(req.body)
    candidates.push(req.body);
    res.status(200).send(req.body);
});

app.get('/candidates/search', function(req, res) {
    if(candidates.length === 0)
        res.status(404).send("No candidates exists");
    else {
        const inputSkills = (req.query.skills).split(",");
        let highestSkillMatch = 0;
        let highestCandidateIndex;
        candidates.forEach((c, index)=>{
            let skillMatch = 0;
            c.skills.forEach((s)=>{
                inputSkills.forEach((is) => {
                    if(is == s)
                        ++skillMatch;
                })
            })
            if(skillMatch !=0 && skillMatch > highestSkillMatch) {
                highestSkillMatch = skillMatch
                highestCandidateIndex = index;
            }
        })

        if(highestSkillMatch === 0 )
            res.status(404).send("No suitable cantidate found");
        else
            res.status(200).send(candidates[highestCandidateIndex]);
    }
});

app.listen(process.env.HTTP_PORT || 3000,()=>{
    console.log('running')
});