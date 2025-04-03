import pandas as pd
import numpy as np
import tensorflow as tf
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load dataset
df = pd.read_excel("real_estate_data.xlsx", engine="openpyxl")

# ✅ Convert transaction_date to ordinal integer
df["transaction_date"] = pd.to_datetime(df["transaction_date"]).map(lambda x: x.toordinal())

# ✅ Compute min/max and ensure they are stored as integers
transaction_date_min = int(df["transaction_date"].min())
transaction_date_max = int(df["transaction_date"].max())

# 🔍 Debug: Print transaction_date types
print(f"transaction_date min: {transaction_date_min} (type: {type(transaction_date_min)})")
print(f"transaction_date max: {transaction_date_max} (type: {type(transaction_date_max)})")

# ✅ Normalize transaction_date
df["transaction_date"] = (df["transaction_date"] - transaction_date_min) / (transaction_date_max - transaction_date_min)

# ✅ Save min/max as integers
joblib.dump({'min': transaction_date_min, 'max': transaction_date_max}, 'transaction_date_minmax.pkl')
print("✅ transaction_date_minmax.pkl saved successfully!")

# Normalize data using StandardScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['transaction_date', 'location_encoded', 'year_built', 'size', 'bedrooms']])

# ✅ Save the trained scaler
joblib.dump(scaler, "scaler.pkl")
print("✅ scaler.pkl saved successfully!")

# Normalize target variable (price) using StandardScaler
scaler_y = StandardScaler()
y_scaled = scaler_y.fit_transform(df[['price']])

# Save the target scaler
joblib.dump(scaler_y, "scaler_y.pkl")
print("✅ scaler_y.pkl saved successfully!")

# Split data into training and testing sets (using scaled target variable)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_scaled, test_size=0.2, random_state=42)

# Build Deep Learning Model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1)
])

# Compile model
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train model
model.fit(X_train, y_train, epochs=50, batch_size=16, validation_data=(X_test, y_test))

# ✅ Save trained model
model.save("real_estate_price_model.h5")
print("✅ Model and scaler saved successfully!")
