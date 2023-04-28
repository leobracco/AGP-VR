
// Configuración de red
const char* ssid = "AgroParallel2.4";
const char* password = "1564santiago";
void setup_wifi() {
  Serial.println();
  Serial.println();
  Serial.print("Conectando con: ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
//secured_client.setTrustAnchors(&cert); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  
  
}
