import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { LEVELS, LevelId } from '@/lib/constants';
import { LevelBadge } from '@/components/LevelBadge';
import { QrCode, Key, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Demo license keys for testing
const DEMO_KEYS: Record<string, LevelId> = {
  'AB12-CD34-EF56-GH01': 'LEVEL_1',
  'AB12-CD34-EF56-GH02': 'LEVEL_2',
  'AB12-CD34-EF56-GH03': 'LEVEL_3',
  'AB12-CD34-EF56-GH04': 'LEVEL_4',
  'AB12-CD34-EF56-GH05': 'LEVEL_5',
};

const KitActivation = () => {
  const navigate = useNavigate();
  const [licenseKey, setLicenseKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activatedLevel, setActivatedLevel] = useState<LevelId | null>(null);

  const formatLicenseKey = (value: string) => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    // Add dashes every 4 characters
    const parts = cleaned.match(/.{1,4}/g) || [];
    return parts.slice(0, 4).join('-');
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatLicenseKey(e.target.value);
    setLicenseKey(formatted);
    setError(null);
  };

  const handleActivate = async () => {
    if (licenseKey.length !== 19) {
      setError('Please enter a valid 16-character license key');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const level = DEMO_KEYS[licenseKey];
    
    if (level) {
      setActivatedLevel(level);
      toast({
        title: 'Kit Activated! 🎉',
        description: `You've unlocked ${LEVELS[level].name}!`,
      });
    } else {
      setError('Invalid or already used license key. Please check and try again.');
    }

    setIsLoading(false);
  };

  const handleContinue = () => {
    if (activatedLevel) {
      // Store the level in localStorage for demo purposes
      localStorage.setItem('atribot_user_level', activatedLevel);
      localStorage.setItem('atribot_is_authenticated', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Activate Your Kit
              </h1>
              <p className="text-muted-foreground">
                Enter the license key from your Atribot kit card to unlock your courses
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {!activatedLevel ? (
                <motion.div
                  key="activation-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-display">
                        <Key className="w-5 h-5 text-primary" />
                        Enter License Key
                      </CardTitle>
                      <CardDescription>
                        Find the 16-character key on your kit card
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="license-key">License Key</Label>
                        <Input
                          id="license-key"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          value={licenseKey}
                          onChange={handleKeyChange}
                          className="text-center text-xl tracking-widest font-mono h-14"
                          maxLength={19}
                        />
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-destructive text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {error}
                          </motion.div>
                        )}
                      </div>

                      <Button
                        variant="hero"
                        className="w-full"
                        size="lg"
                        onClick={handleActivate}
                        disabled={isLoading || licenseKey.length !== 19}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Activating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Activate Kit
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                          Demo keys for testing: AB12-CD34-EF56-GH01 (Level 1) to GH05 (Level 5)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="border-secondary/50 glow-box">
                    <CardContent className="pt-8 text-center space-y-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                      >
                        <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-secondary" />
                        </div>
                      </motion.div>

                      <div>
                        <h2 className="font-display text-2xl font-bold mb-2">
                          Kit Activated Successfully! 🎉
                        </h2>
                        <p className="text-muted-foreground">
                          Welcome to Atribot! You've unlocked:
                        </p>
                      </div>

                      <LevelBadge level={activatedLevel} size="lg" />

                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          {LEVELS[activatedLevel].description}
                        </p>
                      </div>

                      <Button
                        variant="hero"
                        className="w-full"
                        size="lg"
                        onClick={handleContinue}
                      >
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              <p>
                Don't have a kit yet?{' '}
                <a href="#" className="text-primary hover:underline">
                  Purchase here
                </a>
              </p>
              <p className="mt-2">
                Having trouble?{' '}
                <a href="#" className="text-primary hover:underline">
                  Contact support
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KitActivation;
