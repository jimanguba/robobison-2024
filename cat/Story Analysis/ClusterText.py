from sentence_transformers import SentenceTransformer, util
import nltk

# Predefined activity topics
activities = ["Interactive play with feather toys with Luna", 
 "Playing hide and seek", 
 "Playing tag or fetch games", 
 "Brushing or grooming the cat", 
 "Enjoy television or screens together, no work", 
 "Feeding the treats", 
 "Taking a nap with the cat"]

# Generate embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")
activity_embeddings = model.encode(activities, convert_to_tensor=True)

def clusterText(text, topics=[], definedThreshold=0.35):
    
    # If we get requested from user to use their topics
    if len(topics) == 0:
        topics = activities
        topic_embeddings = activity_embeddings
    else:
        topic_embeddings = model.encode(topics, convert_to_tensor=True)
    
    # Preprocess: Tokenize sentences
    sentences = nltk.sent_tokenize(text)
    
    # Generate embeddings
    sentence_embeddings = model.encode(sentences, convert_to_tensor=True)
    
    # Compute similarity and cluster sentences into topics
    similarityMatrix = util.pytorch_cos_sim(sentence_embeddings, topic_embeddings)

    # Map each sentence to the most similar activity
    sentence_to_activity = {}

    for index, sentence in enumerate(sentences):
        best_activity_idx = similarityMatrix[index].argmax().item()
        
        # Set the threshold, we will accept a sentence to be in multiple topic group
        # The threshold are set to be 80% of the highest similarity
        threshold = similarityMatrix[index][best_activity_idx]
        
        sentence_to_activity[sentence] = []
        
        # Append the topics 
        for i in range(len(topics)):
            if similarityMatrix[index][i] >= max(threshold, definedThreshold):
                sentence_to_activity[sentence].append(topics[i])

    # Group sentences by activity
    grouped_sentences = {activity: [] for activity in topics}
    for sentence in sentences:
        for act in sentence_to_activity[sentence]:
            grouped_sentences[act].append(sentence)

    # Return dictionary of grouped sentences
    return grouped_sentences
    
