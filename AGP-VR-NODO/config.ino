void iniciarLittleFS()
{
  if (LittleFS.begin()) {
        Serial.println(F("done."));
    } else {
        Serial.println(F("fail."));
    }
}
  
DynamicJsonDocument loadConfig(const char* FileName) {
  File configFile = LittleFS.open(FileName, "r");
  if (!configFile) {
    Serial.println("No se puede abrir el archivo en Load");

  }

  DynamicJsonDocument doc(1024);
  auto error = deserializeJson(doc, configFile);
  if (error) {
    Serial.println("No se puede parsear el archivo");
 
  }

  configFile.close();
  
 return doc;
}

bool saveConfig(DynamicJsonDocument& json,const char* FileName) {
 

  File configFile = LittleFS.open(FileName, "w");
  if (!configFile) {
    Serial.println("No se puede abrir el archivo para grabar");
    return false;
  }
  else
    Serial.println("Se grabo correctamente");
  serializeJson(json, Serial);
  serializeJson(json, configFile);
  configFile.close();
  return true;
}

void ConfigPid()
{
   DynamicJsonDocument data = loadConfig("/PidConfig.json");
    PidConfig.PWM_MIN = data["pwm_minimo"].as<double>();
    PidConfig.PWM_MAX = data["pwm_maximo"].as<double>();  
    PidConfig.KP = data["kp"].as<float>();
    PidConfig.KI = data["ki"].as<float>();
    PidConfig.KD = data["kd"].as<float>();
     Serial.print(" PidConfig.PWM_MIN:");
    Serial.println( PidConfig.PWM_MIN);
    Serial.print(" PidConfig.PWM_MAX:");
    Serial.println( PidConfig.PWM_MAX);
    Serial.print(" PidConfig.KP:");
    Serial.println( PidConfig.KP,4);
    Serial.print(" PidConfig.KI:");
    Serial.println( PidConfig.KI,4);
    Serial.print(" PidConfig.KD:");
    Serial.println( PidConfig.KD,4);
 
}
void ConfigMotor()
{
    DynamicJsonDocument data = loadConfig("/MotorConfig.json");
    MotorConfig.DOSIS_POR_HA = data["dosis_ha"].as<float>();
    MotorConfig.MODO = data["modo"].as<int>();  
    MotorConfig.VELOCIDAD = data["velocidad"].as<float>();
    MotorConfig.PWM_MANUAL = data["pwm_manual"].as<double>();    
    Serial.print(" MotorConfig.DOSIS_POR_HA:");
    Serial.println( MotorConfig.DOSIS_POR_HA);
    Serial.print(" MotorConfig.MODO:");
    Serial.println( MotorConfig.MODO);
    Serial.print(" MotorConfig.VELOCIDAD:");
    Serial.println( MotorConfig.VELOCIDAD,4);
    Serial.print(" MotorConfig.PWM_MANUAL:");
    Serial.println( MotorConfig.PWM_MANUAL);
  
}

void ConfigCal()
{
    DynamicJsonDocument data = loadConfig("/CalConfig.json");
    CalConfig.PULSOS = data["pulsos_cal"].as<float>();
    CalConfig.MUESTRA = data["calibrar_muestra"].as<float>();    
    CalConfig.GR_PULSO = data["dosis_pulso"].as<float>();    
    CalConfig.ANCHO_LABOR = data["ancho_labor"].as<float>();    
    Serial.print(" CalConfig.PULSOS:");
    Serial.println( CalConfig.PULSOS);
    Serial.print(" CalConfig.MUESTRA:");
    Serial.println( CalConfig.MUESTRA);
    Serial.print(" CalConfig.GR_PULSO:");
    Serial.println( CalConfig.GR_PULSO,4);
    Serial.print(" CalConfig.ANCHO_LABOR:");
    Serial.println( CalConfig.ANCHO_LABOR);
  
}


 



  

  
