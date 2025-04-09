import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load datasets
adult_df = pd.read_csv("Autism-Adult-Data.csv")
child_df = pd.read_csv("Autism-Child-Data.csv")

# Preprocessing function
def preprocess_data(df, target_col):
    df = df.copy()
    
    # Remove unnecessary columns with missing values
    drop_cols = [col for col in df.columns if '?' in df[col].astype(str).values]
    df.drop(columns=drop_cols, inplace=True, errors='ignore')

    # Label encoding for categorical variables
    label_encoders = {}
    for col in df.select_dtypes(include=['object']).columns:
        if col != target_col:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            label_encoders[col] = le

    # Convert target variable to binary
    df[target_col] = df[target_col].map({'YES': 1, 'NO': 0, 'Yes': 1, 'No': 0})

    # Drop NaN values
    df.dropna(inplace=True)

    return df, label_encoders

# Process datasets
adult_df, _ = preprocess_data(adult_df, "Class/ASD")
child_df, _ = preprocess_data(child_df, "Class/ASD Traits ")

# Train function
def train_model(df, target_col):
    X = df.drop(columns=[target_col])
    y = df[target_col]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    return model

# Train both models
adult_model = train_model(adult_df, "Class/ASD")
child_model = train_model(child_df, "Class/ASD Traits ")

# Save both models in a single pickle file
model_dict = {"adult": adult_model, "child": child_model}
with open("model.pkl", "wb") as file:
    pickle.dump(model_dict, file)

print("Models saved as a single pickle file: model.pkl")
