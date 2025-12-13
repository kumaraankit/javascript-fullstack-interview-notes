# What is WebRTC?

WebRTC (Web Real-Time Communication) is a browser technology that enables **real-time audio, video, and data communication** directly between devices using **peer-to-peer (P2P)** connections. It allows browsers to stream media and exchange data with **very low latency**, without requiring plugins or external media servers.

---

## Why WebRTC Exists
Before WebRTC, real-time communication required heavy servers or plugins. WebRTC provides:
- Direct P2P communication  
- High-quality audio & video  
- Strong built-in encryption  
- Browser-native support in Chrome, Firefox, Safari, Edge  

---

## Key Features of WebRTC
### 1. Peer-to-Peer (P2P) Communication
Browsers can send audio, video, or data directly to each other.

### 2. NAT Traversal
Uses **STUN** and **TURN** servers to determine IP addresses and establish a connection even behind firewalls.

### 3. Secure by Default
Uses **DTLS** and **SRTP** to encrypt all audio, video, and data.

### 4. Real-Time Performance
Very low latency, suitable for live video/audio and interactive apps.

---

## How WebRTC Works (High-Level)
1. **Signaling**: Clients exchange session details via WebSockets or any server.  
2. **ICE Candidate Collection**: WebRTC finds potential network paths.  
3. **STUN/TURN**:
   - STUN: Finds public IP.  
   - TURN: Relays when direct P2P fails.  
4. **Peer connection established**  
5. **Real-time audio/video/data flow begins**

---

## WebRTC Components
### RTCPeerConnection
Handles ICE, codecs, encryption, and network.

### RTCDataChannel
Allows sending arbitrary data (chat, file transfer).

### getUserMedia API
Captures audio and video from the user's mic/camera.

---

## Where WebRTC Is Used?
- Google Meet  
- WhatsApp Web  
- Zoom Web Client  
- Discord  
- Video conferencing apps  
- Multiplayer low-latency games  
- File sharing tools  

---

## WebRTC vs WebSockets

| Feature | WebRTC | WebSockets |
|--------|---------|------------|
| Type | Peer-to-peer | Client–server |
| Best For | Audio/Video/Data streaming | Messaging, notifications |
| Latency | Ultra-low | Moderate |
| Needs signaling server | Yes | No |

---

## Summary
WebRTC is a browser-based technology that enables secure, low-latency, peer-to-peer communication for audio, video, and data. It powers modern video calling, conferencing, gaming, and live interactive applications on the web.

