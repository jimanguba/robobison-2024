from fastapi import FastAPI
from pydantic import BaseModel
import RoBERTa
import ClusterText

# Create an instance of the FastAPI class
app = FastAPI()

# Define the Pydantic model for input validation
class Story(BaseModel):
    story: str

# Output the sentiment scores
@app.get("/story-analysis", response_model=dict)
def analyzeMood(story: Story):
    # We first cluster the text into predefined activities
    
    return ClusterText.clusterText(story.story)
    
    return RoBERTa.polarity_scores_roberta(story.story)