import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Picker, Text, TouchableOpacity } from 'react-native';
import { Table, Rows, Row } from 'react-native-table-component';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents () {
    const [ incidents, setIncidents ] = useState([]); 
    const [ total, setTotal ] = useState(0);

    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.lenght === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`incidents?page=${page}`);

        setIncidents([... incidents, ... response.data]);
        setTotal(response.headers['x-total-count']);     
        setPage(page + 1);
        setLoading(false);
    }
    
    useEffect(() => {
        loadIncidents();
    }, []);
    
    const [ selectedValue, setSelectedValue ] = useState("Publicador");
    
    return(
        <View style={styles.container}> 
        	
            <View style={styles.header}>
                <Text style={styles.title}>Atividades</Text>
                <Text style={styles.headerText}>24 Abr. 2020</Text>
            </View>
            
            <Text style={styles.namePublisher}>Clovis Daniel Costa</Text>
            <Text style={styles.title, { paddingLeft: 30 }}>2020</Text>
            <Text style={styles.namePublisher}>Novembro</Text>
 
            <Picker 
            
                selectedValue={selectedValue}

                style={styles.privillege, { height: 30, width: 200 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label="Publicador" value="Publicador" />
                <Picker.Item label="PioneiroAuxiliar" value="Pioneiro Auxiliar" />
                <Picker.Item label="PioneiroAuxiliar30" value="Pioneiro Auxiliar 30" />
                <Picker.Item label="PioneiroRegular" value="Pioneiro Regular" />
                <Picker.Item label="PioneiroEspecial" value="Pioneiro Especial" />

            </Picker>


                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>Nome1</Text>
                        
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>Nome2</Text>

                        <Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
                        <Text style={styles.incidentValue}>Nome3</Text>                       
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>Nome3</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>    
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>

        </View>
    );
}
