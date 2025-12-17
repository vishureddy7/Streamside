import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Video, Mic, MicOff, VideoOff, Settings, ArrowLeft, Users, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

export default function StudioLobby() {
  const { studioId } = useParams();
  const navigate = useNavigate();
  
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState('default');
  const [selectedMicrophone, setSelectedMicrophone] = useState('default');
  const [selectedSpeaker, setSelectedSpeaker] = useState('default');
  const [copied, setCopied] = useState(false);

  // Mock studio data
  const studio = {
    name: 'Weekly Podcast',
    description: 'Our weekly discussion on tech trends',
    activeParticipants: 2,
  };

  const inviteLink = `${window.location.origin}/join/${studioId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinCall = () => {
    navigate(`/studio/${studioId}/call`);
  };

  // Mock device lists
  const cameras = [
    { id: 'default', name: 'Default Camera' },
    { id: 'camera1', name: 'HD Webcam (Front)' },
  ];

  const microphones = [
    { id: 'default', name: 'Default Microphone' },
    { id: 'mic1', name: 'Blue Yeti' },
    { id: 'mic2', name: 'AirPods Pro' },
  ];

  const speakers = [
    { id: 'default', name: 'Default Speaker' },
    { id: 'speaker1', name: 'MacBook Pro Speakers' },
    { id: 'speaker2', name: 'AirPods Pro' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center gap-2">
              <Video className="size-6 text-primary" />
              <span className="text-lg">{studio.name}</span>
            </div>

            <Link to={`/studio/${studioId}/settings`}>
              <Button variant="ghost" size="icon">
                <Settings className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preview & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Preview */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                  {videoEnabled ? (
                    <div className="size-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <Video className="size-24 text-primary/40" />
                      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                        <p className="text-sm">You</p>
                      </div>
                    </div>
                  ) : (
                    <div className="size-full flex items-center justify-center bg-muted">
                      <div className="text-center">
                        <VideoOff className="size-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Camera is off</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 flex items-center justify-center gap-4">
                  <Button
                    variant={audioEnabled ? 'default' : 'destructive'}
                    size="lg"
                    className="rounded-full size-14"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Mic className="size-6" /> : <MicOff className="size-6" />}
                  </Button>
                  
                  <Button
                    variant={videoEnabled ? 'default' : 'destructive'}
                    size="lg"
                    className="rounded-full size-14"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <Video className="size-6" /> : <VideoOff className="size-6" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Device Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Device Settings</CardTitle>
                <CardDescription>
                  Configure your audio and video devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Camera</Label>
                  <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cameras.map((camera) => (
                        <SelectItem key={camera.id} value={camera.id}>
                          {camera.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Microphone</Label>
                  <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {microphones.map((mic) => (
                        <SelectItem key={mic.id} value={mic.id}>
                          {mic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Speakers</Label>
                  <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {speakers.map((speaker) => (
                        <SelectItem key={speaker.id} value={speaker.id}>
                          {speaker.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Studio Info & Join */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Studio Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Studio Name</Label>
                  <p className="mt-1">{studio.name}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1 text-sm">{studio.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="size-4 text-muted-foreground" />
                  <span className="text-sm">
                    {studio.activeParticipants} participant{studio.activeParticipants !== 1 ? 's' : ''} in call
                  </span>
                  {studio.activeParticipants > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                      Live
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invite Others</CardTitle>
                <CardDescription>
                  Share this link with guests to join
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted rounded-md px-3 py-2 text-sm truncate">
                    {inviteLink}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full"
              onClick={handleJoinCall}
            >
              Join Studio
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}