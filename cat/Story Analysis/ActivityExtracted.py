import RoBERTa
import ClusterText

# Official activities topics
officialActivites = [
    "Play With Toy",
    "Play Hide And Seek",
    "Play Tag Or Fetch",
    "Brush The Cat",
    "Watch Tv",
    "Feed Treats",
    "Take A Nap"
]

text = "This morning, I woke up to my cat, Luna, gently nudging my hand with her nose. After stretching, she followed me to the kitchen, where I made coffee and fed her breakfast. She purred contentedly as she enjoyed her meal. Later, while I worked on my laptop, Luna perched on the windowsill, watching birds with keen interest. In the afternoon, we played with her favorite feather toy, her agile leaps making me laugh. As the sun set, Luna curled up beside me on the couch, her warmth a comforting presence. It was a simple, peaceful day, shared with my furry friend."
    
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
            officialTopic = ClusterText.clusterText(activity, topics=officialActivites.copy(), definedThreshold=-1)
            officialTopic = next((key for key, value in officialTopic.items() if len(value) > 0), None)
 
            activites_joyness[officialTopic] = compressSemanticResult(RoBERTa.polarity_scores_roberta(paragraphs))
        
    return activites_joyness

extractActivity(text)