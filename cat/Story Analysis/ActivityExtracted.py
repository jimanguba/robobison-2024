import RoBERTa
import ClusterText
import re

# Given a list of sentences, group them into paragraphs
def groupIntoText(sentences):
    text = ""
    for sentence in sentences:
        text += sentence + ". "
    return text

# Turn the semantic result into one value
def compressSemanticResult(semantic_result):
    result = semantic_result["positive"] - semantic_result["negative"]
    
    return result

# Function to formalize activity names
def getOfficialActivities(activities):
    officialActivities = []
    
    for activity in activities:
        # Lowercase for consistent processing
        activity = activity.lower()
        
        # Define simplifications
        activity = re.sub(r"interactive play with.*toys", "Play with Toy", activity)
        activity = re.sub(r"playing hide and seek", "Play Hide and Seek", activity)
        activity = re.sub(r"playing tag or fetch games", "Play Tag or Fetch", activity)
        activity = re.sub(r"brushing or grooming the cat", "Brush the Cat", activity)
        activity = re.sub(r"enjoy television or screens.*", "Watch TV", activity)
        activity = re.sub(r"feeding the treats", "Feed Treats", activity)
        activity = re.sub(r"taking a nap with the cat", "Take a Nap", activity)

        # Capitalize the first letter of each word
        activity = activity.title()
        
        officialActivities.append(activity)
    
    return officialActivities


# Extract activities from text and return the mood of owner during the activities
def extractActivity(text):
    
    # Cluster activities into topics of activites
    grouped_activities = ClusterText.clusterText(text)
    activites_joyness = {}
    
    for activity in grouped_activities.keys():
        # we only care the activities that have at least 1 sentence      
        if len(grouped_activities[activity]) > 0:
             # Group them into a big text
            paragraphs = groupIntoText(grouped_activities[activity])
            
            # Extract the mood of owner during the activities
            activites_joyness[getOfficialActivities([activity])[0]] = compressSemanticResult(RoBERTa.polarity_scores_roberta(paragraphs))
        
    return activites_joyness
