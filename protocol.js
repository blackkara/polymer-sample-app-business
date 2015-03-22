var KipyoSentence = (function(){
    'use strict';
    
   /**
    * Kipyo tracking sentence
    * $KPYT,1,fused:root,10,38.467416,27.159084,1423167000,90,90
    *
    * Kipyo geofencing sentence
    * $KPYG,1,fused:root,10,38.467416,27.159084,1423167000,90,90,10,1
    */
    
    var fieldSeperator = ',';
    var sentenceSeperator = ';';
    
   /** 
    * Kipyo tracking sentence : $KPYT
    * $KPYT includes 9 tokens (9 fields about tracking)
    *
    * @Identifier
    * @Device id
    * @Provider 
    * @Accuracy 
    * @Latitude 
    * @Longitude 
    * @Date
    * @Speed 
    * @Bearing
    */
    var kpytTokenLength = 9;
    var kpytIdentifier = 'KPYT';
    
   /** 
    * Kipyo geofencing sentence: $KPYG
    * $KPYG includes 11 tokens (11 fields about tracking)
    * 
    * @Identifier
    * @Device id 
    * @Provider 
    * @Accuracy 
    * @Latitude 
    * @Longitude 
    * @Date
    * @Speed 
    * @Bearing
    * @Geofence id 
    * @Geofencing type
    */
    var kpygTokenLength = 11;
    var kpygIdentifier = 'KPYG';
    
    
    
    var protocol = {};

    protocol.parse = function(sentence){
        
        if((typeof sentence)!== 'string') throw new Error('sentence parameter is not a string');
        if(sentence.length === 0) throw new Error('sentence length can not be 0');
             
        
        var merged = sentence.split(sentenceSeperator);
        
        if(merged.length === 1) return protocol.parseSingle(sentence);
        
        if(merged.length > 1) return protocol.parseMerged(merged);
        
        throw new Error('sentence parameter is not a string');
    };
    
    protocol.kpyt = function(data){
        
        var k = [];
        
        k.push('$KPYT');
        k.push(data.deviceId);
        k.push(data.provider);
        k.push(data.accuracy);
        k.push(data.latitude);
        k.push(data.longitude);
        k.push(data.date);
        k.push(data.speed);
        k.push(data.bearing);
        
        var kpyt = k.join();
        return kpyt;
        
    };
    
    protocol.kpyg = function(data){
        
        var k = [];
        
        k.push('$KPYG');
        k.push(data.deviceId);
        k.push(data.provider);
        k.push(data.accuracy);
        k.push(data.latitude);
        k.push(data.longitude);
        k.push(data.date);
        k.push(data.speed);
        k.push(data.bearing);
        k.push(data.geofenceId);
        k.push(data.geofenceType);
        
        var kpyg = k.join();
        return kpyg;
    
    };

    protocol.parseMerged = function(merged){
        
        /**
        * Multi (merged)
        * $KPYT,1,fused:root,10,38.467416,27.159084,1423167000,90,90;
        * $KPYT,1,fused:root,10,38.467332,27.159461,1423167010,88,90;
        * $KPYT,1,fused:root,10,38.467227,27.159606,1423167020,85,90;
        * $KPYT,1,fused:root,10,38.467148,27.159727,1423167030,88,90;
        * $KPYT,1,fused:root,10,38.467048,27.159889,1423174140,92,90
        */

        var sentences = [];
        for(var i = 0; i < merged.length; i++){
            sentences.push(protocol.parseSingle(merged[i]));
        }
        return sentences;
    };

    protocol.parseSingle = function(sentence){
        
        /**
        * Single
        * $KPYT,1,fused:root,10,38.467416,27.159084,1423167000,90,90
        */
        var tokens = sentence.split(fieldSeperator);
        
        if(tokens.length !== kpytTokenLength && tokens.length !== kpygTokenLength) 
            throw new Error('Token length error');

        var identifier = tokens[0].substring(1);
        
        if(identifier !== kpytIdentifier && identifier !== kpygIdentifier)
            throw new Error('Identifier error');

        /*  Kipyo tracking sentence $KPYT
            1. @Identifier
            2. @Device id
            3. @Provider
            4. @Accuracy
            5. @Latitude
            6. @Longitude
            7. @Date
            8. @Speed
            9. @Bearing
        */
        if(identifier === kpytIdentifier){
            if(tokens.length === kpytTokenLength){
                return {
                    identifier: identifier,
                    device: tokens[1],
                    provider: tokens[2],
                    accuracy: tokens[3],
                    latitude: tokens[4],
                    longitude: tokens[5],
                    date: tokens[6],
                    speed: tokens[7],
                    bearing: tokens[8]
                };
            }
        }

        /*  Kipyo geofencing sentence $KPYG
            1. @Identifier
            2. @Device id
            3. @Provider
            4. @Accuracy
            5. @Latitude
            6. @Longitude
            7. @Date
            8. @Speed
            9. @Bearing
            10. @Geofence id
            11. @Geofencing type
        */
        if(identifier === kpygIdentifier){
            if(tokens.length === kpygTokenLength){
                return {
                    identifier: identifier,
                    device: tokens[1],
                    provider: tokens[2],
                    accuracy: tokens[3],
                    latitude: tokens[4],
                    longitude: tokens[5],
                    date: tokens[6],
                    speed: tokens[7],
                    bearing: tokens[8],
                    geofence: tokens[9],
                    geotype: tokens[10]
                };
            }
        }

        throw new Error('Sentence cant recognized');
    };

    return protocol;
}());

var hasModule = (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined');
if (hasModule) module.exports = KipyoSentence; 
else window.KipyoSentence = KipyoSentence;