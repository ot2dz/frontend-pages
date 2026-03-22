'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Bot, Sparkles, Save, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApiClient } from '@/lib/axios';
import { useAuth } from '@/lib/auth';
import { useEffect } from 'react';

export default function SettingsAIPage() {
    const { token } = useAuth();
    const apiClient = getApiClient(token || '');
    const queryClient = useQueryClient();

    const [apiKey, setApiKey] = useState('');
    const [systemPrompt, setSystemPrompt] = useState('أنت مساعد ذكي لخدمة عملاء متجر YoussefTex. تجيب بلباق وتساعد في تتبع الطلبات.');
    const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);

    const { data: serverSettings, isLoading } = useQuery({
        queryKey: ['settings-ai'],
        queryFn: async () => {
            if (!token) return {};
            const res = await apiClient.get('/settings');
            // تحويل المصفوفة إلى كائن
            const settingsMap = res.data.reduce((acc: any, curr: any) => {
                acc[curr.key] = curr.value;
                return acc;
            }, {});
            return settingsMap;
        },
        enabled: !!token,
    });

    useEffect(() => {
        if (serverSettings) {
            setApiKey(serverSettings['ai_api_key'] || '');
            if (serverSettings['ai_system_prompt']) {
                setSystemPrompt(serverSettings['ai_system_prompt']);
            }
            setAutoReplyEnabled(serverSettings['ai_auto_reply_enabled'] === 'true');
        }
    }, [serverSettings]);

    const mutation = useMutation({
        mutationFn: async () => {
            const payload = {
                settings: [
                    { key: 'ai_api_key', value: apiKey },
                    { key: 'ai_system_prompt', value: systemPrompt },
                    { key: 'ai_auto_reply_enabled', value: String(autoReplyEnabled) }
                ]
            };
            const res = await apiClient.put('/settings', payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings-ai'] });
            toast.success('تم حفظ إعدادات الذكاء الاصطناعي بنجاح');
        },
        onError: () => {
            toast.error('حدث خطأ أثناء حفظ الإعدادات');
        }
    });

    const handleSaveChanges = () => {
        mutation.mutate();
    };

    return (
        <div className="space-y-6">
            {/* قسم إعدادات النموذج */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-blue-50 rounded-xl">
                            <Bot className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-black text-gray-900">إعدادات النموذج</CardTitle>
                            <CardDescription className="text-sm text-gray-500">قم بتكوين اتصال API والسلوك العام للذكاء الاصطناعي.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="apiKey" className="text-sm font-bold text-gray-700">مفتاح API (OpenRouter / OpenAI)</Label>
                        <Input
                            id="apiKey"
                            type="password"
                            placeholder="sk-or-v1-..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:border-primary"
                        />
                        <p className="text-xs text-gray-400">يتم تخزين المفتاح بشكل مشفر في قاعدة البيانات.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="systemPrompt" className="text-sm font-bold text-gray-700">الأمر النظامي (System Prompt)</Label>
                        <Textarea
                            id="systemPrompt"
                            placeholder="أنت مساعد ذكي..."
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            className="min-h-[120px] bg-gray-50 border-gray-200 rounded-xl focus:border-primary resize-none"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* قسم الردود التلقائية */}
            <Card className="rounded-2xl border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-6 border-b border-gray-50 bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-50 rounded-xl">
                            <MessageSquare className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-black text-gray-900">الردود التلقائية</CardTitle>
                            <CardDescription className="text-sm text-gray-500">إدارة كيفية رد البوت على استفسارات العملاء تلقائياً.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span className="font-bold text-gray-800">تفعيل الرد التلقائي</span>
                            </div>
                            <p className="text-xs text-gray-500">سيمكن البوت من الرد على الرسائل غير المعروفة تلقائياً.</p>
                        </div>
                        <Switch
                            checked={autoReplyEnabled}
                            onCheckedChange={setAutoReplyEnabled}
                            className="data-[state=checked]:bg-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* زر الحفظ */}
            <div className="flex justify-end">
                <Button 
                    onClick={handleSaveChanges}
                    disabled={mutation.isPending}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20 transition-transform active:scale-95"
                >
                    <Save className="w-4 h-4 ml-2" />
                    {mutation.isPending ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </Button>
            </div>
        </div>
    );
}