package com.example.realestate.websocket;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

public class PredictionWebSocketHandler extends TextWebSocketHandler {
    private static final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
        System.out.println("🔗 WebSocket Connection Established: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
        System.out.println("❌ WebSocket Connection Closed: " + session.getId());
    }

    public static void sendPredictionUpdate(String prediction) {
        for (WebSocketSession session : sessions) {
            try {
                session.sendMessage(new TextMessage(prediction));
            } catch (IOException e) {
                System.err.println("⚠️ Error sending WebSocket message: " + e.getMessage());
            }
        }
    }
}
