// Establece el servidor MQTT y la función callback
void setup_mqtt()
{
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);
}
// Función callback que se llama cada vez que se recibe un mensaje MQTT
int SECCION;
void callback(char * topic, byte * payload, unsigned int length)
{

       Serial.println(topic);
    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload);
    if (error)
    {
        Serial.print(F("Falla el decode: "));
        Serial.println(error.f_str());
        return;
    }
     if (strcmp(topic, "/secciones") == 0)
    {
                   PidConfig.SECCION=  doc["seccion"];
           Serial.println(topic);
           Serial.print("SECCION:");
           Serial.println(PidConfig.SECCION);
           
         
            
     }
    if (strcmp(topic, "/tractor/velocidad") == 0)
    {
        
        speedKmH = doc["velocidad"]; // 10.5
    }
     if (strcmp(topic, "/nodo/motor/1/dosis") == 0)
    {

          if (saveConfig(doc, "/MotorConfig.json"))
        {
            MotorConfig.DOSIS_POR_HA = doc["dosis_ha"].as<float>();
            MotorConfig.MODO = doc["modo"].as<int>();  
            MotorConfig.VELOCIDAD = doc["velocidad"].as<float>();
            MotorConfig.PWM_MANUAL = doc["pwm_manual"].as<float>(); 
        }
        
        
        
    }
    if (strcmp(topic, "/nodo/motor/1/calibracion") == 0)
    {
       
          if (saveConfig(doc, "/CalConfig.json"))
        {
            CalConfig.PWM_MANUAL = doc["pwm_manual"].as<int>();
            CalConfig.ANCHO_LABOR = doc["ancho_labor"].as<float>();  
            CalConfig.GR_PULSO = doc["dosis_pulso"].as<float>();
            CalConfig.GIROS_MOTOR = doc["giros_motor"].as<int>();    
            CalConfig.PULSOS = doc["pulsos_cal"].as<int>();    
            ESTADO = 2;
            pulseCountRev = 0;
            pulseCountCal = 0;
        }
        
        
        
    }
    if (strcmp(topic, "/nodo/motor/1/calibracion/stop") == 0)
    {
        Cytron_Motor.setSpeed(0);
        ESTADO = 0;
    }
    if (strcmp(topic, "/nodo/motor/1/pwm_minimo") == 0)
    {
        pulseCountRev = 0;
        pulseCountCal = 0;
        CalConfig.PWM_MANUAL = doc["pwm_manual"];
        CalConfig.GIROS_MOTOR = doc["giros_motor"];
        ESTADO = 2;
    }
    
     if (strcmp(topic, "/nodo/motor/1/parametros/autocal") == 0)
    {
                  
            MotorConfig.AUTOCAL =  doc["auto"].as<int>();
         
            
     }
    if (strcmp(topic, "/nodo/motor/1/parametros") == 0)
    {
        if (saveConfig(doc, "/PidConfig.json"))
        {
            
            PidConfig.PWM_MIN = doc["pwm_minimo"].as<int>();
            PidConfig.PWM_MAX = doc["pwm_maximo"].as<int>();  
            PidConfig.KP = doc["kp"].as<double>();
            PidConfig.KI = doc["ki"].as<double>();
            PidConfig.KD = doc["kd"].as<double>();
            PidConfig.SECCION = doc["seccion"].as<int>();
            
            //PID_Motor.setGains(PidConfig.KP, PidConfig.KI, PidConfig.KD);
            PID_Motor.SetOutputLimits( PidConfig.PWM_MIN, PidConfig.PWM_MAX);
            PID_Motor.SetTunings(PidConfig.KP, PidConfig.KI, PidConfig.KD);
            //PID_Motor.tune(PidConfig.KP, PidConfig.KI, PidConfig.KD);
            //PID_Motor.limit( PidConfig.PWM_MIN, PidConfig.PWM_MAX);
            
            
        }
    }
}
void reconnect()
{
    while (!client.connected())
    {
        if (client.connect(String(ESP.getChipId()).c_str()))
        {
            client.subscribe("/tractor/velocidad");
            client.subscribe("/motor/1/parametros");
            client.subscribe("/nodo/#");
            client.subscribe("/secciones");
            
        }
        else
        {
            delay(5000);
        }
    }
}
