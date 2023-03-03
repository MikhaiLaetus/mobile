import React from 'react';
import { IPost } from '../models/IPost';
import { Card } from '@rneui/base';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export const PostCard = ({data}: {data: IPost}) => {
	const ellipsis = (str: string, n: number) => {
		return str.slice(0, n) + '...'
	}

	return (
		<Link href={{pathname: 'post', params:{id: data.id}}} style={styles.link}>
			<Card key={data.id} containerStyle={styles.card}>
				<Card.Title style={styles.cardTitle}><Text style={{ fontFamily: 'SpaceMono' }}>{ellipsis(data.title, 20)}</Text></Card.Title>
				<Card.Divider style={styles.cardDivider}><Text style={{ fontFamily: 'SpaceMono' }}>{ellipsis(data.body, 40)}</Text></Card.Divider>
			</Card>
		</Link>
	)
};

const styles = StyleSheet.create({
	link: {
		width: 350,
		height: 130,
		margin: 10
	},
	card: {
		padding: 10,
		borderRadius: 10,
		width: 350,
		height: 130
	},
	cardTitle: {
		fontSize: 20,
	},
	cardDivider: {
		margin: 0,
	},
});